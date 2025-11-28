import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../common/module/shared/shared-module';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Spinner } from '../../common/services/spinner';
import { InvestmentService } from '../../common/services/investment-service';
import { Snackbar } from '../../common/services/snackbar';
import { CommonFunctions } from '../../common/services/common-functions';
import { ApiErrorHandler } from '../../common/services/api-error-handler';
import { Investment } from '../../common/models/investment.model';

type investmentFormModel = {
  id: FormControl<number>;
  name: FormControl<string>;
  type: FormControl<'Equity' | 'Mutual Fund' | 'Dept'>;
  amount: FormControl<number>;
  purchaseDate: FormControl<Date>;
  currentValue: FormControl<number>;
};

@Component({
  selector: 'app-add-investment',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './add-investment.html',
  styleUrl: './add-investment.scss',
})
export class AddInvestment {
  private readonly fb = inject(NonNullableFormBuilder);

  isSubmitting = signal<boolean>(false);
  serverError = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form: FormGroup<investmentFormModel> = this.fb.group({
    id: this.fb.control<number>(0, { validators: [Validators.required, Validators.min(1)] }),
    name: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    type: this.fb.control<'Equity' | 'Mutual Fund' | 'Dept'>('Equity', {
      validators: [Validators.required],
    }),
    amount: this.fb.control<number>(0, { validators: [Validators.required, Validators.min(1)] }),
    purchaseDate: this.fb.control<Date>(new Date()),
    currentValue: this.fb.control<number>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  typeList = ['Equity', 'Mutual Fund', 'Dept'];

  constructor(
    private commonFunctions: CommonFunctions,
    private spinner: Spinner,
    private investmentService: InvestmentService,
    private snackbar: Snackbar,
    private apiErrorHandler: ApiErrorHandler
  ) {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.serverError.set(null);
    this.successMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackbar.error('Please fill the all the mandatory fields first.');
      return;
    }

    const values = this.form.getRawValue();

    const payload: Investment = {
      id: values.id,
      name: values.name,
      type: values.type,
      amount: values.amount,
      purchaseDate: this.commonFunctions.formatDateToYMD(values.purchaseDate),
      currentValue: values.currentValue,
    };

    payload.id = Number(payload.id);

    if (this.investmentService.investments().some((x) => x.id === payload.id)) {
      this.snackbar.error('Investment with the same ID already exists.');
      this.serverError.set('Investment with the same ID already exists.');
      return;
    }

    this.isSubmitting.set(true);

    this.investmentService.addFreshInvestment(payload).subscribe({
      next: (data) => {
        this.isSubmitting.set(false);
        this.successMessage.set(`Investment "${data.name}" added successfully.`);
        this.snackbar.success(`Investment "${data.name}" added successfully.`);
        this.form.reset({
          id: 0,
          name: '',
          type: 'Equity',
          amount: 0,
          purchaseDate: new Date(),
          currentValue: 0,
        });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.serverError.set('Failed to add investment. Please try again.');
        this.apiErrorHandler.handleApiError(err);
      },
    });
  }
}
