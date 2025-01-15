import { Component, input } from '@angular/core';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { RouterLink } from '@angular/router';

/**
 * Represents a single movie card displaying movie details.
 */
@Component({
  selector: 'app-movie-card',
  imports: [RatingComponent, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  standalone: true,
})
export class MovieCardComponent {
  /**
   * Input property for the movie data.
   * Receives a `MovieInterface` object.
   */
  movie = input.required<MovieInterface>();

  /**
   * Generates a URL for the movie poster image.
   * @param posterPath - The relative path of the poster image.
   * @returns The complete URL for the poster image or a placeholder image if the path is null.
   */
  getImageUrl(posterPath: string | null): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return posterPath ? `${baseUrl}${posterPath}` : '/assets/placeholder.png';
  }
}
