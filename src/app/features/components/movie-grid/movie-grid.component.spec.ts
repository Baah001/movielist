import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieGridComponent } from './movie-grid.component';
import { MovieInterface } from 'src/app/shared/models/tmdb.interface';

describe('MovieGridComponent', () => {
  let component: MovieGridComponent;
  let fixture: ComponentFixture<MovieGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movies', mockMovies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const mockMovies: MovieInterface[] = [
  {
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
  },
  {
    adult: false,
    backdrop_path: '/Ag6qhzsJd3k1NKuNrG9RmhZDMh7.jpg',
    genre_ids: [18, 80],
    id: 640,
    original_language: 'en',
    original_title: 'Catch Me If You Can',
    overview:
      'A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit.',
    popularity: 90.296,
    poster_path: '/sdYgEkKCDPWNU6KnoL4qd8xZ4w7.jpg',
    release_date: '2002-12-16',
    title: 'Catch Me If You Can',
    video: false,
    vote_average: 7.979,
    vote_count: 15753,
  },
];
