import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movie);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const movie: MovieInterface = {
  adult: false,
  backdrop_path: '/bdD39MpSVhKjxarTxLSfX6baoMP.jpg',
  genre_ids: [18, 36, 10752],
  id: 857,
  original_language: 'en',
  original_title: 'Saving Private Ryan',
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
