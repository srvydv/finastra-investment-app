import { Component } from '@angular/core';
import { SharedModule } from '../../common/module/shared/shared-module';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../../common/services/spinner';
import { InvestmentService } from '../../common/services/investment-service';
import { Snackbar } from '../../common/services/snackbar';
import { CommonFunctions } from '../../common/services/common-functions';
import { ApiErrorHandler } from '../../common/services/api-error-handler';

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
    private commonFunctions: CommonFunctions,
    private spinner: Spinner,
    private investmentService: InvestmentService,
    private snackbar: Snackbar,
    private apiErrorHandler: ApiErrorHandler
  ) {}

  onSave() {
    const formValue = this.investmentObj;

    const payload = {
      name: formValue.name,
      type: formValue.type,
      amount: Number(formValue.amount),
      purchaseDate: this.commonFunctions.formatDateToYMD(formValue.purchaseDate),
      currentValue: Number(formValue.currentValue),
    };

    this.onAddInvestment(payload);
  }

  onAddInvestment(payload: any) {
    // this.spinner.show();
    this.investmentService.addFreshInvestment(payload).subscribe(
      (data) => {
        // this.spinner.hide();
        this.snackbar.success('Investment added successfully');
      },
      (err) => {
        // this.spinner.hide();
        this.apiErrorHandler.handleApiError(err);
      }
    );
  }
}
