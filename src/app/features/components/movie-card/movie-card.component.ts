import { Component, input } from '@angular/core';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';

@Component({
  selector: 'app-movie-card',
  imports: [RatingComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  standalone: true,
})
export class MovieCardComponent {
  movie = input.required<MovieInterface>();

  getImageUrl(posterPath: string | null): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return posterPath ? `${baseUrl}${posterPath}` : '/assets/placeholder.png';
  }

  onCardClick(): void {}
}
