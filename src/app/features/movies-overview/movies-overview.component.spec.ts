import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesOverviewComponent } from './movies-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TmdbApiService } from 'src/app/core/services/tmdb-api.service';
import {
  FavoriteEntertainersEnum,
  MovieInterface,
  PersonInterface,
} from 'src/app/shared/models/tmdb.interface';
import { of } from 'rxjs';
import { PaginatedResultsInterface } from 'src/app/shared/models/paginated-results.interface';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

describe('MoviesOverviewComponent', () => {
  let component: MoviesOverviewComponent;
  let fixture: ComponentFixture<MoviesOverviewComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbApiService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    // Create spies for both TmdbApiService and SnackbarService
    tmdbServiceSpy = jasmine.createSpyObj('TmdbApiService', [
      'getPersonByName',
      'getMoviesByActorAndDirector',
    ]);
    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [MoviesOverviewComponent, HttpClientTestingModule],
      providers: [
        { provide: TmdbApiService, useValue: tmdbServiceSpy },
        { provide: SnackbarService, useValue: snackbarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch actor and director data and update the component state', async () => {
    const mockActorResponse: PersonInterface = {
      id: 1,
      name: 'Tom Hanks',
    } as PersonInterface;
    const mockDirectorResponse: PersonInterface = {
      id: 2,
      name: 'Steven Spielberg',
    } as PersonInterface;

    const mockMoviesResponse: PaginatedResultsInterface<MovieInterface> = {
      page: 1,
      total_pages: 1,
      total_results: 10,
      results: [
        {
          id: 101,
          title: 'Movie Title',
          release_date: '2023-01-01',
        } as MovieInterface,
      ],
    };

    tmdbServiceSpy.getPersonByName.and.callFake(
      (name: FavoriteEntertainersEnum) => {
        if (name === FavoriteEntertainersEnum.TomHanks) {
          return of(mockActorResponse);
        } else if (name === FavoriteEntertainersEnum.StevenSpielberg) {
          return of(mockDirectorResponse);
        }
        return of(null);
      },
    );

    tmdbServiceSpy.getMoviesByActorAndDirector.and.returnValue(
      of(mockMoviesResponse),
    );

    await component.fetchData();

    expect(component.moviesResponse()).toEqual(mockMoviesResponse);
    expect(component.movies()).toEqual(mockMoviesResponse.results);
    expect(tmdbServiceSpy.getPersonByName).toHaveBeenCalledWith(
      FavoriteEntertainersEnum.TomHanks,
    );
    expect(tmdbServiceSpy.getPersonByName).toHaveBeenCalledWith(
      FavoriteEntertainersEnum.StevenSpielberg,
    );
    expect(tmdbServiceSpy.getMoviesByActorAndDirector).toHaveBeenCalledWith(
      1,
      2,
    ); // Actor and director IDs
  });
});
