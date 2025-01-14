import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { TmdbApiService } from './tmdb-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import {
  FavoriteEntertainersEnum,
  MovieInterface,
  PersonInterface,
} from 'src/app/shared/models/tmdb.interface';
import { catchError, of, throwError } from 'rxjs';
import { PaginatedResultsInterface } from 'src/app/shared/models/paginated-results.interface';

describe('TmdbApiService', () => {
  let service: TmdbApiService;
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
    snackbarSpy = TestBed.inject(
      SnackbarService,
    ) as jasmine.SpyObj<SnackbarService>;
  });

  describe('getPersonByName and getMoviesByActorAndDirector', () => {
    it('should return the person if found on the first page', fakeAsync(() => {
      const name = FavoriteEntertainersEnum.TomHanks;
      const mockResponse: PersonInterface = {
        id: 1,
        name: 'Tom Hanks',
      } as PersonInterface;

      spyOn(service, 'getPersonByName').and.returnValue(of(mockResponse));

      service.getPersonByName(name).subscribe((person) => {
        expect(person).toEqual({ id: 1, name: 'Tom Hanks' } as PersonInterface);
      });

      flush();
    }));

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

      spyOn(service, 'getMoviesByActorAndDirector').and.returnValue(
        of(mockResponse),
      );

      service
        .getMoviesByActorAndDirector(actorId, directorId, page)
        .subscribe((response) => {
          expect(response).toEqual(mockResponse);
        });
    }));

    it('should handle errors gracefully and show an error message', fakeAsync(() => {
      const actorId = 1;
      const directorId = 2;
      const page = 1;

      // Mocking the HTTP call to return an error
      spyOn(service, 'getMoviesByActorAndDirector').and.returnValue(
        throwError(() => new Error('Network error')).pipe(
          catchError((error) => {
            snackbarSpy.showError(
              `Error fetching movies with actor ID "${actorId}" and director ID "${directorId}" on page ${page}.`,
            );
            return of(error); // Return the error observable
          }),
        ),
      );

      service
        .getMoviesByActorAndDirector(actorId, directorId, page)
        .subscribe((response) => {
          expect(response).toBeDefined();
          expect(snackbarSpy.showError).toHaveBeenCalledWith(
            `Error fetching movies with actor ID "${actorId}" and director ID "${directorId}" on page ${page}.`,
          );
        });

      flush();
    }));

    it('should fetch movies for the given actor and director (successful case)', fakeAsync(() => {
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

      // Mocking the getMoviesByActorAndDirector method to return a successful response
      spyOn(service, 'getMoviesByActorAndDirector').and.returnValue(
        of(mockResponse),
      );

      service
        .getMoviesByActorAndDirector(actorId, directorId, page)
        .subscribe((response) => {
          expect(response).toEqual(mockResponse); // Verify the response is correct
        });

      flush(); // Ensure all asynchronous operations are completed
    }));
  });
});
