import { Component, OnInit, signal } from '@angular/core';
import { InvestmentService } from '../../services/investment-service';
import { Investment } from '../../models/investment.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-list',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.scss',
})
export class InvestmentList implements OnInit {
  allInvestments = signal<Investment[]>([]);
  isShowTable = signal<boolean>(false);
  constructor(private investmentServices: InvestmentService) {}

  ngOnInit(): void {
    this.investmentServices.loadInvestments();
  }

  displayInvestments() {
    this.isShowTable.set(true);
    this.allInvestments.set(this.investmentServices.investments());
  }
}
