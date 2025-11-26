import { Injectable } from '@angular/core';
import { Snackbar } from './snackbar';
import { Spinner } from './spinner';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorHandler {
  constructor(private snackbar: Snackbar, private spinner: Spinner) {}
  handleApiError(error: any) {
    console.log('error', error);
    this.spinner.hide();
    this.snackbar.error(
      error?.message
        ? error?.message
        : 'Something went wrong please open console or network tab to see...'
    );
  }
}
