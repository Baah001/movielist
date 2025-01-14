import { TestBed } from '@angular/core/testing';
import { snackbarMessageDuration, SnackbarService } from './snackbar.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let notificationSpy: jasmine.SpyObj<NzNotificationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NzNotificationService', [
      'success',
      'error',
      'warning',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: NzNotificationService, useValue: spy },
      ],
    });

    service = TestBed.inject(SnackbarService);
    notificationSpy = TestBed.inject(
      NzNotificationService,
    ) as jasmine.SpyObj<NzNotificationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showSuccess', () => {
    it('should call success notification with the correct parameters', () => {
      const message = 'Success!';
      const description = 'Operation completed successfully.';

      service.showSuccess(message, description);

      expect(notificationSpy.success).toHaveBeenCalledWith(
        message,
        description,
        {
          nzClass: 'custom-snackbar-success',
          nzDuration: snackbarMessageDuration,
        },
      );
    });

    it('should call success notification with an empty description if not provided', () => {
      const message = 'Success!';

      service.showSuccess(message);

      expect(notificationSpy.success).toHaveBeenCalledWith(message, '', {
        nzClass: 'custom-snackbar-success',
        nzDuration: snackbarMessageDuration,
      });
    });
  });

  describe('showError', () => {
    it('should call error notification with the correct parameters', () => {
      const message = 'Error!';
      const description = 'Something went wrong.';

      service.showError(message, description);

      expect(notificationSpy.error).toHaveBeenCalledWith(message, description, {
        nzClass: 'custom-snackbar-error',
        nzDuration: snackbarMessageDuration,
      });
    });

    it('should call error notification with an empty description if not provided', () => {
      const message = 'Error!';

      service.showError(message);

      expect(notificationSpy.error).toHaveBeenCalledWith(message, '', {
        nzClass: 'custom-snackbar-error',
        nzDuration: snackbarMessageDuration,
      });
    });
  });

  describe('showWarning', () => {
    it('should call warning notification with the correct parameters', () => {
      const message = 'Warning!';
      const description = 'This is a warning.';

      service.showWarning(message, description);

      expect(notificationSpy.warning).toHaveBeenCalledWith(
        message,
        description,
        {
          nzClass: 'custom-snackbar-warning',
          nzDuration: snackbarMessageDuration,
        },
      );
    });

    it('should call warning notification with an empty description if not provided', () => {
      const message = 'Warning!';

      service.showWarning(message);

      expect(notificationSpy.warning).toHaveBeenCalledWith(message, '', {
        nzClass: 'custom-snackbar-warning',
        nzDuration: snackbarMessageDuration,
      });
    });
  });
});
