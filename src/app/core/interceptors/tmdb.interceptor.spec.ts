import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('tmdbInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const mockEnvironment = {
    tmdbBaseUrl: 'https://api.themoviedb.org/3/',
    tmdbApiKey: 'test_api_key',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: 'environment', useValue: mockEnvironment },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not modify non-API requests', fakeAsync(() => {
    const externalUrl = 'https://example.com/test';
    const mockResponse = { data: 'test' };

    httpClient.get(externalUrl).subscribe();

    tick();

    const req = httpMock.expectOne(externalUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  }));
});
