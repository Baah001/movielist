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
 * A loader interceptor that displays a loader if an HTTP request takes more half a second.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private pendingLoaderTimeout: number | null = null;
  private readonly activeRequests = new Set<HttpRequest<unknown>>();
  private loaderShown = false;
  private readonly showLoaderTimeOut = 500; // halve a second

  constructor(private readonly loaderService: LoaderService) {}

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

  private scheduleLoaderToShow(): void {
    // If this is the first active request and the loader is not already shown,
    // schedule the loader to be shown after a delay
    if (this.activeRequests.size === 1 && !this.loaderShown) {
      this.pendingLoaderTimeout = setTimeout(() => {
        this.loaderShown = true;
        this.loaderService.setLoadingState(true);
      }, this.showLoaderTimeOut) as unknown as number;
    }
  }

  private handleResponse(event: HttpEvent<unknown>): void {
    // If the event is a response, the loader is not already shown, and the loader is scheduled to be shown,
    // cancel the scheduled loader
    if (
      event instanceof HttpResponse &&
      !this.loaderShown &&
      this.pendingLoaderTimeout !== null
    ) {
      clearTimeout(this.pendingLoaderTimeout);
    }
  }

  private decrementRequestsAndHideLoader(): void {
    // If there are no more active requests, cancel the scheduled loader if it is scheduled,
    // hide the loader if it is shown, and reset the loaderShown flag
    if (this.activeRequests.size === 0) {
      if (this.pendingLoaderTimeout !== null) {
        clearTimeout(this.pendingLoaderTimeout);
      }
      this.loaderService.setLoadingState(false);
      this.loaderShown = false;
    }
  }
}
