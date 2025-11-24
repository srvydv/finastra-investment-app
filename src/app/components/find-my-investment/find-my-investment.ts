import { Component, computed, inject, signal } from '@angular/core';
import { InvestmentService } from '../../services/investment-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';
import { Investment } from '../../models/investment.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-find-my-investment',
  imports: [CommonModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './find-my-investment.html',
  styleUrl: './find-my-investment.scss',
})
export class FindMyInvestment {
  private svc = inject(InvestmentService);

  id = signal<number | null>(null);
  loading = signal<boolean>(false);
  error = signal('');

  // private id$ = toObservable(this.id).pipe(debounceTime(150), distinctUntilChanged());

  // investment = toSignal<Investment | null>(
  //   this.id$.pipe(
  //     switchMap((id) => {
  //       this.error.set('');
  //       if (id === null || Number.isNaN(id)) {
  //         this.loading.set(false);
  //         return of(null);
  //       }
  //       this.loading.set(true);
  //       return this.svc.getInvestment(id).pipe(
  //         finalize(() => this.loading.set(false)),
  //         catchError((err) => {
  //           console.log('Error fetching investment:', err);
  //           this.error.set('Unable to find investment with the provided ID.');
  //           return of(null);
  //         })
  //       );
  //     })
  //   ),
  //   { initialValue: null }
  // );

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
          console.log('Error fetching investment:', err);
          this.error.set('Unable to find investment with the provided ID.');
          return of(null);
        })
      )
      .subscribe((inv) => this.investment.set(inv));
  }
}
