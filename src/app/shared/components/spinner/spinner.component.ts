import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [NzSpinComponent, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  standalone: true,
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) {}
}
