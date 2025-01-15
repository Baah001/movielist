import { Component, OnInit, signal } from '@angular/core';
import { TmdbApiService } from 'src/app/core/services/tmdb-api.service';
import { firstValueFrom } from 'rxjs';
import {
  FavoriteEntertainersEnum,
  MovieInterface,
  PersonInterface,
} from 'src/app/shared/models/tmdb.interface';
import { MovieGridComponent } from 'src/app/features/components/movie-grid/movie-grid.component';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { PaginatedResultsInterface } from 'src/app/shared/models/paginated-results.interface';
import { NzResultComponent } from 'ng-zorro-antd/result';

/**
 * Displays an overview of movies featuring specific actors and directors.
 */
@Component({
  selector: 'app-movies-overview',
  imports: [MovieGridComponent, PaginatorComponent, NzResultComponent],
  templateUrl: './movies-overview.component.html',
  styleUrl: './movies-overview.component.scss',
  standalone: true,
})
export class MoviesOverviewComponent implements OnInit {
  /**
   * Holds the response for paginated movie results.
   */
  moviesResponse = signal<PaginatedResultsInterface<MovieInterface> | null>(
    null,
  );

  /**
   * Contains the list of movies to be displayed.
   */
  movies = signal<MovieInterface[]>([]);

  constructor(private tmdbService: TmdbApiService) {}

  /**
   * Lifecycle hook that initializes the component.
   * Fetches the movies based on actor and director information.
   */
  ngOnInit(): void {
    this.fetchData().then();
  }

  /**
   * Fetches movies featuring Tom Hanks and directed by Steven Spielberg.
   * Retrieves their IDs and then fetches movies based on those IDs.
   */
  async fetchData(): Promise<void> {
    const [actor, director] = await Promise.all([
      this.getPersonIdByName(FavoriteEntertainersEnum.TomHanks),
      this.getPersonIdByName(FavoriteEntertainersEnum.StevenSpielberg),
    ]);

    if (actor && director) {
      const moviesResponse = await firstValueFrom(
        this.tmdbService.getMoviesByActorAndDirector(actor.id, director.id),
      );

      if (moviesResponse) {
        this.moviesResponse.set(moviesResponse); // Set the entire response for pagination
        this.movies.set(moviesResponse.results); // Extract and set the movies list
      }
    }
  }

  /**
   * Retrieves the ID of a person (actor or director) by their name.
   * @param personName - The name of the person to search for.
   * @returns A promise resolving to the person details or null if not found.
   */
  getPersonIdByName(
    personName: FavoriteEntertainersEnum,
  ): Promise<PersonInterface | null> {
    return firstValueFrom(this.tmdbService.getPersonByName(personName).pipe());
  }
}
