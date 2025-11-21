import { Component, OnInit, signal } from '@angular/core';
import { InvestmentService } from '../../services/investment-service';
import { Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investment-list',
  imports: [],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.scss',
})
export class InvestmentList implements OnInit {
  allInvestments = signal<Investment[]>([]);
  constructor(private investmentServices: InvestmentService) {}

  ngOnInit(): void {
    this.investmentServices.loadInvestments();
  }

  displayInvestments() {
    this.allInvestments.set(this.investmentServices.investments());
  }
}
