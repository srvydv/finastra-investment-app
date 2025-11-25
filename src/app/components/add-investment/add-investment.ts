import { Component } from '@angular/core';
import { SharedModule } from '../../common/module/shared/shared-module';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../common/services/common-service';
import { Spinner } from '../../common/services/spinner';
import { InvestmentService } from '../../common/services/investment-service';

@Component({
  selector: 'app-add-investment',
  imports: [SharedModule, FormsModule],
  templateUrl: './add-investment.html',
  styleUrl: './add-investment.scss',
})
export class AddInvestment {
  investmentObj: any = {
    name: '',
    type: '',
    amount: '',
    purchaseDate: new Date(),
    currentValue: '',
  };

  typeList = ['Equity', 'Mutual Fund', 'Dept'];

  constructor(
    private commonService: CommonService,
    private spinner: Spinner,
    private investmentService: InvestmentService
  ) {}

  onSave() {
    const formValue = this.investmentObj;
    console.log('formValue', formValue);

    const payload = {
      name: formValue.name,
      type: formValue.type,
      amount: Number(formValue.amount),
      purchaseDate: this.commonService.formatDateToYMD(formValue.purchaseDate),
      currentValue: Number(formValue.currentValue),
    };

    this.addInvestment(payload);
  }

  addInvestment(payload: any) {
    this.spinner.show();
    this.investmentService.addFreshInvestment(payload).subscribe(
      (data) => {
        console.log('Investment added successfully', data);
        this.spinner.hide();
      },
      (err) => {
        console.log('error', err);
        this.spinner.hide();
      }
    );
  }
}
