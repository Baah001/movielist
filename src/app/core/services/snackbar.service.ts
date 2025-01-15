import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// Default duration for snackbar messages in milliseconds
export const snackbarMessageDuration = 5000; // 5 seconds

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private notification: NzNotificationService) {}

  /**
   * Displays a success message.
   * @param message - The main message to display.
   * @param description - Additional details about the success (optional).
   */
  showSuccess(message: string, description?: string): void {
    this.notification.success(message, description || '', {
      nzClass: 'custom-snackbar-success',
      nzDuration: snackbarMessageDuration, // Duration before auto-dismiss
    });
  }

  /**
   * Displays an error message.
   * @param message - The main message to display.
   * @param description - Additional details about the error (optional).
   */
  showError(message: string, description?: string): void {
    this.notification.error(message, description || '', {
      nzClass: 'custom-snackbar-error',
      nzDuration: snackbarMessageDuration, // Duration before auto-dismiss
    });
  }

  /**
   * Displays a warning message.
   * @param message - The main message to display.
   * @param description - Additional details about the warning (optional).
   */
  showWarning(message: string, description?: string): void {
    this.notification.warning(message, description || '', {
      nzClass: 'custom-snackbar-warning',
      nzDuration: snackbarMessageDuration, // Duration before auto-dismiss
    });
  }
}
