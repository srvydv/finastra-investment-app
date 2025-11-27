import { Component, computed, inject, signal } from '@angular/core';
import { SharedModule } from '../../common/module/shared/shared-module';
import { finalize, catchError, of } from 'rxjs';
import { Investment } from '../../common/models/investment.model';
import { InvestmentService } from '../../common/services/investment-service';
import { FormsModule } from '@angular/forms';
import { ApiErrorHandler } from '../../common/services/api-error-handler';
import { Snackbar } from '../../common/services/snackbar';

@Component({
  selector: 'app-delete-investment',
  imports: [SharedModule, FormsModule],
  templateUrl: './delete-investment.html',
  styleUrl: './delete-investment.scss',
})
export class DeleteInvestment {
  private svc = inject(InvestmentService);
  private apiErrorHandler = inject(ApiErrorHandler);
  private snackbar = inject(Snackbar);

  id = signal<number | null>(null);
  loading = signal<boolean>(false);
  error = signal('');

  investment = signal<Investment | null>(null);

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

  deleteInvestment() {
    this.svc.deleteInvestment(this.id()!).subscribe(
      (data) => {
        this.snackbar.success('Investment deleted successfully');
        this.id.set(null);
        this.investment.set(null);
      },
      (err) => {
        this.apiErrorHandler.handleApiError(err);
      }
    );
  }
}
