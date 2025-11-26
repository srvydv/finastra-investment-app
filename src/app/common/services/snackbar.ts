import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private durationInMs = 2000;

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.open(message, ['snackbar-success']);
  }

  error(message: string) {
    this.open(message, ['snackbar-error']);
  }

  warning(message: string) {
    this.open(message, ['snackbar-warning']);
  }

  private open(message: string, panelClass: string[]) {
    this.snackBar.open(message, 'Close', {
      duration: this.durationInMs,
      panelClass: panelClass,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
