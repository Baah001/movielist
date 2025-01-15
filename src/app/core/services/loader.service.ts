import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Internal subject to track the loading state; initialized with `null` to indicate no state.
  private readonly isLoadingSubject = new BehaviorSubject<boolean | null>(null);

  /**
   * Public observable for the loading state.
   * - Filters out `null` values, ensuring only `true` or `false` are emitted.
   */
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject
    .asObservable()
    .pipe(filter((item): item is boolean => item !== null));

  /**
   * Updates the loading state.
   * @param loadingState - A boolean indicating whether loading is active (`true`) or not (`false`).
   */
  setLoadingState(loadingState: boolean): void {
    this.isLoadingSubject.next(loadingState);
  }
}
