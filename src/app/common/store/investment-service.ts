import { Injectable } from '@angular/core';
import { Investment } from '../models/investment.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private readonly baseurl = 'http://localhost:3000/investments';

  async getAll(): Promise<Investment[]> {
    const response = await fetch(this.baseurl);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    return (await response.json()) as Investment[];
  }
}
