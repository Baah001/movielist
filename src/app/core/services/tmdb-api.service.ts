import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, expand, map, Observable, of, takeWhile } from 'rxjs';
import {
  FavoriteEntertainersEnum,
  MovieInterface,
  PersonInterface,
} from 'src/app/shared/models/tmdb.interface';
import { PaginatedResultsInterface } from 'src/app/shared/models/paginated-results.interface';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {}

  /**
   * Fetches a person by name, searching through paginated results if necessary.
   * @param name - The name of the person to search for.
   * @returns An observable of the found person or null if not found.
   */
  getPersonByName(
    name: FavoriteEntertainersEnum,
  ): Observable<PersonInterface | null> {
    const url = `/api/search/person`;

    return this.http
      .get<PaginatedResultsInterface<PersonInterface>>(url, {
        params: { query: name, page: 1 },
      })
      .pipe(
        expand((response) => this.fetchNextPageIfNeeded(response, url, name)),
        takeWhile((response) => !!response), // Continue until no more pages
        map((response) => this.findPersonInResponse(response, name)), // Check for the target person
        catchError((error) => {
          const message = `Error fetching person by name "${name}":`;
          this.snackbarService.showError(message);
          console.error(message, error);
          return of(null);
        }),
      );
  }

  /**
   * Fetches the next page of results if the target person hasn't been found and there are more pages.
   */
  private fetchNextPageIfNeeded(
    response: PaginatedResultsInterface<PersonInterface>,
    url: string,
    name: string,
  ): Observable<PaginatedResultsInterface<PersonInterface>> | Observable<null> {
    const targetNotFound = !response.results.some(
      (person) => person.name === name,
    );
    const morePagesAvailable = response.page < response.total_pages;

    if (targetNotFound && morePagesAvailable) {
      return this.http.get<PaginatedResultsInterface<PersonInterface>>(url, {
        params: { query: name, page: response.page + 1 },
      });
    }

    return of(null);
  }

  /**
   * Finds the target person in the current response.
   * @param response - The paginated results.
   * @param name - The name of the target person.
   * @returns The target person if found, otherwise null.
   */
  private findPersonInResponse(
    response: PaginatedResultsInterface<PersonInterface>,
    name: string,
  ): PersonInterface | null {
    return response?.results.find((person) => person.name === name) || null;
  }

  /**
   * Fetch all movies where a specific actor and director are involved.
   * @param actorId - ID of the actor (e.g., Tom Hanks).
   * @param directorId - ID of the director (e.g., Steven Spielberg).
   * @param page - The page number for pagination (default is 1).
   */
  getMoviesByActorAndDirector(
    actorId: number,
    directorId: number,
    page = 1,
  ): Observable<PaginatedResultsInterface<MovieInterface>> {
    const url = `/api/discover/movie`;

    return this.http
      .get<PaginatedResultsInterface<MovieInterface>>(url, {
        params: {
          with_cast: actorId.toString(),
          with_crew: directorId.toString(),
          page: page.toString(),
        },
      })
      .pipe(
        catchError((error) => {
          const errorMessage = `Error fetching movies with actor ID "${actorId}" and director ID "${directorId}" on page ${page}.`;
          this.snackbarService.showError(errorMessage);
          console.error(errorMessage, error);
          return of(error);
        }),
      );
  }

  /**
   * Fetches detailed information for a specific movie by its ID.
   * @param id - The unique ID of the movie to fetch details for.
   * @returns An observable containing the movie details or an error message if the request fails.
   */
  getMovieDetail(id: number): Observable<MovieInterface | null> {
    const url = `/api/movie/${id}`;
    return this.http.get<MovieInterface>(url).pipe(
      catchError((error) => {
        const errorMessage = `Error fetching details for movie ID "${id}".`;
        this.snackbarService.showError(errorMessage);
        console.error(errorMessage, error);
        return of(null);
      }),
    );
  }
}
