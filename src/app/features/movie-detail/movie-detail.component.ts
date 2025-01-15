import { Component, OnInit, signal } from '@angular/core';
import { TmdbApiService } from 'src/app/core/services/tmdb-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { UpperCasePipe } from '@angular/common';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { AssetService } from 'src/app/core/services/assets.service';

/**
 * Displays detailed information about a specific movie.
 */
@Component({
  selector: 'app-movie-detail',
  imports: [UpperCasePipe, RatingComponent, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
})
export class MovieDetailComponent implements OnInit {
  /**
   * Holds the details of the current movie.
   */
  movie = signal<MovieInterface | null>(null);

  constructor(
    private tmdbApiService: TmdbApiService, // Service for TMDB API interactions
    private route: ActivatedRoute, // Handles the route parameters
    private assetService: AssetService,
  ) {}

  /**
   * Lifecycle hook that initializes the component.
   * Fetches the movie data when the component loads.
   */
  ngOnInit(): void {
    this.fetchData().then();
  }

  /**
   * Fetches movie details based on the route's `id` parameter.
   */
  private async fetchData(): Promise<void> {
    const params = await firstValueFrom(this.route.params); // Get route parameters
    const id = params['id'];
    if (id) {
      const movieDetail = await firstValueFrom(
        this.tmdbApiService.getMovieDetail(id), // Fetch movie details
      );
      if (movieDetail) {
        this.movie.set(movieDetail); // Set the movie details
      }
    }
  }

  /**
   * Generates the URL for the movie's image.
   * @param path - The relative path of the image.
   * @returns The complete image URL or a placeholder image if the path is null.
   */
  getImageUrl(path: string | null): string {
    return this.assetService.getImageUrl(path);
  }
}
