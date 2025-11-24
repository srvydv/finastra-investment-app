import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvestmentList } from './components/investment-list/investment-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvestmentList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('finastra-investment-app');
}
