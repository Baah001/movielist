import { Component, input } from '@angular/core';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  imports: [NzRateComponent, FormsModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  standalone: true,
})
export class RatingComponent {
  voteAverage = input.required<number>();
  getRating(voteAverage: number): number {
    return voteAverage / 2;
  }
}
