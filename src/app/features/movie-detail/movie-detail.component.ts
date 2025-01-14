import { Component, OnInit, signal } from '@angular/core';
import { TmdbApiService } from 'src/app/core/services/tmdb-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { UpperCasePipe } from '@angular/common';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';

@Component({
  selector: 'app-movie-detail',
  imports: [UpperCasePipe, RatingComponent, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
})
export class MovieDetailComponent implements OnInit {
  movie = signal<MovieInterface | null>(null);

  constructor(
    private tmdbApiService: TmdbApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchData().then();
  }

  private async fetchData(): Promise<void> {
    const params = await firstValueFrom(this.route.params);
    const id = params['id'];
    if (id) {
      const movieDetail = await firstValueFrom(
        this.tmdbApiService.getMovieDetail(id),
      );
      if (movieDetail) {
        this.movie.set(movieDetail);
      }
    }
  }

  getImageUrl(path: string | null): string {
    if (!path) {
      // Return the placeholder image from the assets folder
      return '/assets/placeholder_image_movie_detail.jpg';
    }
    // Return the actual image URL if the path exists
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
