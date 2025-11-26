import { Component, computed, inject, signal } from '@angular/core';
import { finalize, catchError, of } from 'rxjs';
import { Investment } from '../../common/models/investment.model';
import { ApiErrorHandler } from '../../common/services/api-error-handler';
import { InvestmentService } from '../../common/services/investment-service';
import { SharedModule } from '../../common/module/shared/shared-module';
import { FormsModule } from '@angular/forms';
import { CommonFunctions } from '../../common/services/common-functions';

@Component({
  selector: 'app-update-investment',
  imports: [SharedModule, FormsModule],
  templateUrl: './update-investment.html',
  styleUrl: './update-investment.scss',
})
export class UpdateInvestment {
  private svc = inject(InvestmentService);
  private apiErrorHandler = inject(ApiErrorHandler);
  private commonFunctions = inject(CommonFunctions);

  id = signal<number | null>(null);
  loading = signal<boolean>(false);
  error = signal('');
  investment = signal<Investment | null>(null);
  isShowEditInvestmentForm = signal<boolean>(false);
  investmentObj: any = {
    id: '',
    name: '',
    type: '',
    amount: '',
    purchaseDate: new Date(),
    currentValue: '',
  };

  typeList = ['Equity', 'Mutual Fund', 'Dept'];

  fields = computed(() => {
    const inv = this.investment();
    if (!inv) return [];

    const inr = (n: number) =>
      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

    return [
      { label: 'ID', value: inv.id },
      { label: 'Type', value: inv.type },
      { label: 'Amount', value: inr(inv.amount) },
      { label: 'Purchase Date', value: new Date(inv.purchaseDate).toLocaleDateString() },
      { label: 'Current Value', value: inr(inv.currentValue) },
      { label: 'Name', value: inv.name },
    ];
  });

  onIdInput(event: Event) {
    const row = (event.target as HTMLInputElement).value;
    const num = row === '' ? null : Number(row);
    this.id.set(Number.isFinite(num) ? num : null);
  }

  findInvestment() {
    this.error.set('');
    const id = this.id();

    if (id === null || Number.isNaN(id)) {
      this.error.set('Please enter a valid ID.');
      return;
    }

    this.loading.set(true);
    this.svc
      .getInvestment(id)
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError((err) => {
          this.apiErrorHandler.handleApiError(err);
          this.error.set('Unable to find investment with the provided ID.');
          return of(null);
        })
      )
      .subscribe((inv) => this.investment.set(inv));
  }

  onEditInvestment(value: Investment | null) {
    this.isShowEditInvestmentForm.set(true);
    this.investmentObj = {
      id: value?.id,
      name: value?.name,
      type: value?.type,
      amount: value?.amount,
      purchaseDate: this.commonFunctions.isoToNativeDate(value?.purchaseDate),
      currentValue: value?.currentValue,
    };
  }

  onEdit() {
    const payload = {
      name: this.investmentObj?.name,
      type: this.investmentObj?.type,
      amount: this.investmentObj?.amount,
      purchaseDate: this.commonFunctions.formatDateToYMD(this.investmentObj?.purchaseDate),
      currentValue: this.investmentObj?.currentValue,
    };

    this.svc.editInvestment(this.investmentObj?.id, payload).subscribe(
      (data) => {},
      (err) => {}
    );
  }
}
