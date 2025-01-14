import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/movies-overview/movies-overview.component').then(
        (m) => m.MoviesOverviewComponent,
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie-detail/movie-detail.component').then(
        (m) => m.MovieDetailComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
