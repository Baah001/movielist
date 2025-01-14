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

@Component({
  selector: 'app-movies-overview',
  imports: [MovieGridComponent, PaginatorComponent, NzResultComponent],
  templateUrl: './movies-overview.component.html',
  styleUrl: './movies-overview.component.scss',
  standalone: true,
})
export class MoviesOverviewComponent implements OnInit {
  moviesResponse = signal<PaginatedResultsInterface<MovieInterface> | null>(
    null,
  );
  movies = signal<MovieInterface[]>([]);

  constructor(private tmdbService: TmdbApiService) {}

  ngOnInit(): void {
    this.fetchData().then();
  }

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
        this.moviesResponse.set(moviesResponse);
        this.movies.set(moviesResponse.results);
      }
    }
  }

  getPersonIdByName(
    personName: FavoriteEntertainersEnum,
  ): Promise<PersonInterface | null> {
    return firstValueFrom(this.tmdbService.getPersonByName(personName).pipe());
  }
}
