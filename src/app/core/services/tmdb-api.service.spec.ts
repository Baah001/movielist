import { TestBed } from '@angular/core/testing';

import { TmdbApiService } from './tmdb-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TmdbApiService', () => {
  let service: TmdbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TmdbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
