import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../common/module/shared/shared-module';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Snackbar } from '../../common/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  errorMessage = signal<string>('');

  private snackbar = inject(Snackbar);
  private router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.errorMessage.set('');
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.snackbar.error('Please fill in all required fields.');
      return;
    }

    const { userName, password } = this.loginForm.value;
    if (userName !== 'admin' && password !== 'password123') {
      this.errorMessage.set('Invalid username and password.');
      this.snackbar.error('Invalid username and password.');
    } else if (userName !== 'admin') {
      this.errorMessage.set('Invalid username.');
      this.snackbar.error('Invalid username.');
    } else if (password !== 'password123') {
      this.errorMessage.set('Invalid password.');
      this.snackbar.error('Invalid password.');
    } else {
      // Proceed with successful login actions
      this.login();
    }
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.onReset();
    this.snackbar.success('Login successful!');
    this.router.navigate(['/investments-list']);
  }

  onReset() {
    this.errorMessage.set('');
    this.loginForm.reset();
    this.loginForm.markAsPristine();
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsUntouched();
    });
  }
}
