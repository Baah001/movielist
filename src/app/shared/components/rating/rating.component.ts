import { Component, input } from '@angular/core';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';

/**
 * A rating component for displaying movie ratings in a user-friendly way.
 * Uses the NgZorro rate component for a visual star-based rating system.
 */
@Component({
  selector: 'app-rating',
  imports: [NzRateComponent, FormsModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  standalone: true,
})
export class RatingComponent {
  /**
   * The average vote score for the movie (required input).
   * Typically fetched from an external API and displayed as a star rating.
   */
  voteAverage = input.required<number>();

  /**
   * Converts the `voteAverage` score into a rating on a 5-star scale.
   * TMDB scores are out of 10, so they are halved for the star rating.
   *
   * @param voteAverage - The average vote score for the movie.
   * @returns The calculated 5-star scale rating.
   */
  getRating(voteAverage: number): number {
    return voteAverage / 2;
  }
}
