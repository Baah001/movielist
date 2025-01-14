import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: movie.id }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movie);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the full URL when a valid poster path is provided', () => {
    const posterPath = '/examplePosterPath.jpg';
    const result = component.getImageUrl(posterPath);
    expect(result).toBe(
      'https://image.tmdb.org/t/p/w500/examplePosterPath.jpg',
    );
  });

  it('should return the placeholder URL when the poster path is null', () => {
    const posterPath = null;
    const result = component.getImageUrl(posterPath);
    expect(result).toBe('/assets/placeholder.png');
  });

  it('should return the placeholder URL when the poster path is an empty string', () => {
    const posterPath = '';
    const result = component.getImageUrl(posterPath);
    expect(result).toBe('/assets/placeholder.png');
  });

  it('should return the correct URL when a relative poster path is provided', () => {
    const posterPath = '/somePoster.jpg';
    const result = component.getImageUrl(posterPath);
    expect(result).toBe('https://image.tmdb.org/t/p/w500/somePoster.jpg');
  });
});
