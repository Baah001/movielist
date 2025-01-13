import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
export const snackbarMessageDuration = 5000; // 5 seconds
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private notification: NzNotificationService) {}

  showSuccess(message: string, description?: string): void {
    this.notification.success(message, description || '', {
      nzClass: 'custom-snackbar-success',
      nzDuration: snackbarMessageDuration,
    });
  }

  showError(message: string, description?: string): void {
    this.notification.error(message, description || '', {
      nzClass: 'custom-snackbar-error',
      nzDuration: snackbarMessageDuration,
    });
  }

  showWarning(message: string, description?: string): void {
    this.notification.warning(message, description || '', {
      nzClass: 'custom-snackbar-warning',
      nzDuration: snackbarMessageDuration,
    });
  }
}
