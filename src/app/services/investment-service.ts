import { Injectable, signal } from '@angular/core';
import { Investment } from '../models/investment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private appUrl = 'http://localhost:3000/investments'; // app base url

  // signal to hold investments data
  investments = signal<Investment[]>([]);

  constructor(private http: HttpClient) {}

  // method to load investments from backend
  loadInvestments() {
    this.http.get<Investment[]>(this.appUrl).subscribe((data) => {
      this.investments.set(data);
    });
  }
}
