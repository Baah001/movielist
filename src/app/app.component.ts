import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesOverviewComponent } from 'src/app/features/movies-overview/movies-overview.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MoviesOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'movielist';
}
