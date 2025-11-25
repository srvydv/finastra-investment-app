import { Routes } from '@angular/router';
import { InvestmentList } from './components/investment-list/investment-list';
import { FindMyInvestment } from './components/find-my-investment/find-my-investment';

export const routes: Routes = [
  {
    path: 'investments-list',
    component: InvestmentList,
  },
  {
    path: 'find-my-investment',
    component: FindMyInvestment,
  },
  {
    path: 'add-investment',
    loadComponent: () =>
      import('./components/add-investment/add-investment').then((m) => m.AddInvestment),
  },
  {
    path: 'delete-investment',
    loadComponent: () =>
      import('./components/delete-investment/delete-investment').then((m) => m.DeleteInvestment),
  },
];
