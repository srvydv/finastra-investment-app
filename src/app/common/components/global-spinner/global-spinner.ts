import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Spinner } from '../../services/spinner';

@Component({
  selector: 'app-global-spinner',
  imports: [MatProgressSpinner],
  templateUrl: './global-spinner.html',
  styleUrl: './global-spinner.scss',
})
export class GlobalSpinner {
  isLoading = false;

  constructor(private spinnerService: Spinner) {
    this.spinnerService.spinner$.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
