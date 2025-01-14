import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from 'src/app/core/services/loader.service';

describe('LoaderInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let loaderDialogService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderDialogService', [
      'setLoadingState',
    ]);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: LoaderService, useValue: spy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loaderDialogService = TestBed.inject(
      LoaderService,
    ) as jasmine.SpyObj<LoaderService>;
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding
  });

  it('should not show loader if request completes in less than 2 seconds', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({}); // Complete the request

    expect(loaderDialogService.setLoadingState).not.toHaveBeenCalledWith(true);
  });

  it('should show loader if request takes more than 2 seconds', fakeAsync(() => {
    httpClient.get('/test').subscribe();

    tick(2100); // Simulate the passage of 2100ms

    expect(loaderDialogService.setLoadingState).toHaveBeenCalledWith(true);

    // Complete the request to ensure no outstanding requests
    const req = httpMock.expectOne('/test');
    req.flush({});
  }));

  it('should hide loader after request completes', fakeAsync(() => {
    httpClient.get('/test').subscribe();

    tick(2100); // Simulate the passage of 2100ms

    const req = httpMock.expectOne('/test');
    req.flush({});

    expect(loaderDialogService.setLoadingState).toHaveBeenCalledWith(false);
  }));

  it('should hide loader if an error occurs', fakeAsync(() => {
    loaderDialogService.setLoadingState(true);
    loaderDialogService.setLoadingState.calls.reset();
    httpClient.get('/test').subscribe(null, () => ({}));

    const req = httpMock.expectOne('/test');
    req.error(new ErrorEvent('Network error'));
    tick(5000); // Simulate passage of time, more than the 2-second delay

    expect(loaderDialogService.setLoadingState).toHaveBeenCalledWith(false);
  }));
});
