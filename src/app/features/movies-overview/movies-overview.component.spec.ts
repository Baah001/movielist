import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesOverviewComponent } from './movies-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesOverviewComponent', () => {
  let component: MoviesOverviewComponent;
  let fixture: ComponentFixture<MoviesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesOverviewComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
