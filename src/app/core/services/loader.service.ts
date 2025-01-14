import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly isLoadingSubject = new BehaviorSubject<boolean | null>(null);
  readonly isLoading$: Observable<boolean> = this.isLoadingSubject
    .asObservable()
    .pipe(filter((item): item is boolean => item !== null));

  setLoadingState(loadingState: boolean): void {
    this.isLoadingSubject.next(loadingState);
  }
}
