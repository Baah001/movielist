import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/core/services/tmdb-api.service';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let tmdbApiService: jasmine.SpyObj<TmdbApiService>;

  beforeEach(async () => {
    const tmdbApiServiceSpy = jasmine.createSpyObj('TmdbApiService', [
      'getMovieDetail',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: movie.id }),
          },
        },
        { provide: TmdbApiService, useValue: tmdbApiServiceSpy },
      ],
      imports: [MovieDetailComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    tmdbApiService = TestBed.inject(
      TmdbApiService,
    ) as jasmine.SpyObj<TmdbApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movie data when ID is present and movieDetail is valid', async () => {
    tmdbApiService.getMovieDetail.and.returnValue(of(movie));

    await component['fetchData']();
    expect(tmdbApiService.getMovieDetail).toHaveBeenCalledWith(movie.id);
    expect(component.movie()).toEqual(movie);
  });

  it('should not set movie data when ID is present but movieDetail is null', async () => {
    tmdbApiService.getMovieDetail.and.returnValue(of(null));

    await component['fetchData']();
    expect(tmdbApiService.getMovieDetail).toHaveBeenCalledWith(movie.id);
    expect(component.movie()).toBeNull();
  });

  it('should not call getMovieDetail when ID is missing', async () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.params = of({});

    await component['fetchData']();
    expect(component.movie()).toBeNull();
  });

  it('should return correct image URL for valid path', () => {
    const imageUrl = component.getImageUrl('/sample_path.jpg');
    expect(imageUrl).toBe('https://image.tmdb.org/t/p/w500/sample_path.jpg');
  });

  it('should return placeholder image URL for null path', () => {
    const placeholderUrl = component.getImageUrl(null);
    expect(placeholderUrl).toBe('/assets/placeholder_image_movie_detail.jpg');
  });
});

const movie: MovieInterface = {
  adult: false,
  backdrop_path: '/bdD39MpSVhKjxarTxLSfX6baoMP.jpg',
  genre_ids: [18, 36, 10752],
  id: 857,
  original_language: 'en',
  original_title: 'Saving Private Ryan',
  genres: [],
  overview:
    'As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.',
  popularity: 97.15,
  poster_path: '/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg',
  release_date: '1998-07-24',
  title: 'Saving Private Ryan',
  video: false,
  vote_average: 8.218,
  vote_count: 15952,
};
