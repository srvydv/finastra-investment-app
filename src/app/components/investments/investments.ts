import { Component, inject } from '@angular/core';
import { InvestmentStore } from '../../common/store/investment.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investments',
  imports: [CommonModule],
  templateUrl: './investments.html',
  styleUrl: './investments.scss',
})
export class Investments {
  readonly store = inject(InvestmentStore);
}
