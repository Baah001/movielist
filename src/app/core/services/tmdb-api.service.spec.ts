import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { TmdbApiService } from './tmdb-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import {
  FavoriteEntertainersEnum,
  MovieInterface,
  PersonInterface,
} from 'src/app/shared/models/tmdb.interface';
import { PaginatedResultsInterface } from 'src/app/shared/models/paginated-results.interface';

describe('TmdbApiService', () => {
  let service: TmdbApiService;
  let httpMock: HttpTestingController;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    const snackbarSpyObj = jasmine.createSpyObj('SnackbarService', [
      'showError',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TmdbApiService,
        { provide: SnackbarService, useValue: snackbarSpyObj },
      ],
    });

    service = TestBed.inject(TmdbApiService);
    httpMock = TestBed.inject(HttpTestingController);
    snackbarSpy = TestBed.inject(
      SnackbarService,
    ) as jasmine.SpyObj<SnackbarService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPersonByName', () => {
    it('should return the person if found', fakeAsync(() => {
      const name = FavoriteEntertainersEnum.TomHanks;
      const mockResponse: PaginatedResultsInterface<PersonInterface> = {
        page: 1,
        total_pages: 1,
        results: [{ id: 1, name: 'Tom Hanks' } as PersonInterface],
        total_results: 1,
      };

      service.getPersonByName(name).subscribe((person) => {
        expect(person).toEqual(mockResponse.results[0]);
      });

      const req = httpMock.expectOne(
        `/api/search/person?query=Tom%20Hanks&page=1`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      flush();
    }));

    it('should handle errors gracefully and return null', fakeAsync(() => {
      const name = FavoriteEntertainersEnum.TomHanks;

      service.getPersonByName(name).subscribe((person) => {
        expect(person).toBeNull();
        expect(snackbarSpy.showError).toHaveBeenCalledWith(
          `Error fetching person by name "${name}":`,
        );
      });

      const req = httpMock.expectOne(
        `/api/search/person?query=Tom%20Hanks&page=1`,
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      flush();
    }));
  });

  describe('getMoviesByActorAndDirector', () => {
    it('should fetch movies for the given actor and director', fakeAsync(() => {
      const actorId = 1;
      const directorId = 2;
      const page = 1;

      const mockResponse: PaginatedResultsInterface<MovieInterface> = {
        page: 1,
        total_pages: 1,
        total_results: 10,
        results: [
          {
            id: 101,
            title: 'Movie Title',
            release_date: '2023-01-01',
          } as MovieInterface,
        ],
      };

      service
        .getMoviesByActorAndDirector(actorId, directorId, page)
        .subscribe((response) => {
          expect(response).toEqual(mockResponse);
        });

      const req = httpMock.expectOne(
        `/api/discover/movie?with_cast=1&with_crew=2&page=1`,
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      flush();
    }));

    it('should handle errors gracefully and return an error observable', fakeAsync(() => {
      const actorId = 1;
      const directorId = 2;
      const page = 1;

      service
        .getMoviesByActorAndDirector(actorId, directorId, page)
        .subscribe((response) => {
          expect(response).toBeNull();
          expect(snackbarSpy.showError).toHaveBeenCalledWith(
            `Error fetching movies with actor ID "${actorId}" and director ID "${directorId}" on page ${page}.`,
          );
        });

      const req = httpMock.expectOne(
        `/api/discover/movie?with_cast=1&with_crew=2&page=1`,
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      flush();
    }));
  });

  describe('getMovieDetail', () => {
    it('should fetch movie details successfully', fakeAsync(() => {
      const movieId = 101;
      const mockMovie: MovieInterface = {
        id: 101,
        title: 'Movie Title',
        release_date: '2023-01-01',
        genres: [],
        overview: 'Test movie overview',
        adult: false,
        backdrop_path: '/path.jpg',
        genre_ids: [1, 2],
        original_language: 'en',
        original_title: 'Original Title',
        popularity: 100,
        poster_path: '/poster.jpg',
        video: false,
        vote_average: 8.5,
        vote_count: 200,
      };

      service.getMovieDetail(movieId).subscribe((movie) => {
        expect(movie).toEqual(mockMovie);
      });

      const req = httpMock.expectOne(`/api/movie/${movieId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovie);

      flush();
    }));

    it('should handle errors gracefully and return null', fakeAsync(() => {
      const movieId = 101;

      service.getMovieDetail(movieId).subscribe((movie) => {
        expect(movie).toBeNull();
        expect(snackbarSpy.showError).toHaveBeenCalledWith(
          `Error fetching details for movie ID "${movieId}".`,
        );
      });

      const req = httpMock.expectOne(`/api/movie/${movieId}`);
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      flush();
    }));
  });
});
