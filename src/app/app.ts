import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvestmentList } from './components/investment-list/investment-list';
import { FindMyInvestment } from './components/find-my-investment/find-my-investment';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // InvestmentList,
    FindMyInvestment,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('finastra-investment-app');
}
