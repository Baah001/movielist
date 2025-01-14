import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {}
