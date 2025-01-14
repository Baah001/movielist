import { Component, input } from '@angular/core';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { MovieCardComponent } from 'src/app/features/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-grid',
  imports: [MovieCardComponent],
  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss',
  standalone: true,
})
export class MovieGridComponent {
  movies = input.required<MovieInterface[]>();
}
