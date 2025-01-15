import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/services/loader.service';

/**
 * Interceptor to display a loader when HTTP requests are in progress.
 * Ensures a loader appears if a request takes longer than half a second.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private pendingLoaderTimeout: number | null = null;
  private readonly activeRequests = new Set<HttpRequest<unknown>>();
  private loaderShown = false;
  private readonly showLoaderTimeOut = 500; // Half a second

  constructor(private readonly loaderService: LoaderService) {}

  /**
   * Intercepts HTTP requests to manage the loader state.
   * @param req - The outgoing HTTP request.
   * @param next - The next handler in the chain.
   * @returns An observable of the HTTP event stream.
   */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.activeRequests.add(req);
    this.scheduleLoaderToShow();

    return next.handle(req).pipe(
      tap((event) => this.handleResponse(event)),
      catchError((error) => throwError(() => error)), // Re-throw the error without modifying it
      finalize(() => {
        this.activeRequests.delete(req); // Remove the request from the active requests set
        this.decrementRequestsAndHideLoader();
      }),
    );
  }

  /**
   * Schedules the loader to appear if this is the first active request.
   * Ensures the loader is shown after a small delay to avoid flickering.
   */
  private scheduleLoaderToShow(): void {
    if (this.activeRequests.size === 1 && !this.loaderShown) {
      this.pendingLoaderTimeout = setTimeout(() => {
        this.loaderShown = true;
        this.loaderService.setLoadingState(true);
      }, this.showLoaderTimeOut) as unknown as number;
    }
  }

  /**
   * Handles the HTTP response to cancel any pending loader display.
   * @param event - The HTTP event to handle.
   */
  private handleResponse(event: HttpEvent<unknown>): void {
    if (
      event instanceof HttpResponse &&
      !this.loaderShown &&
      this.pendingLoaderTimeout !== null
    ) {
      clearTimeout(this.pendingLoaderTimeout);
    }
  }

  /**
   * Decrements active requests and hides the loader if no more requests are pending.
   */
  private decrementRequestsAndHideLoader(): void {
    if (this.activeRequests.size === 0) {
      if (this.pendingLoaderTimeout !== null) {
        clearTimeout(this.pendingLoaderTimeout);
      }
      this.loaderService.setLoadingState(false);
      this.loaderShown = false;
    }
  }
}
