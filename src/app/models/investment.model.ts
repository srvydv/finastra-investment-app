export interface Investment {
  id: number;
  name: string;
  type: 'Equity' | 'Mutual Fund' | 'Dept';
  amount: number;
  purchaseDate: string;
  currentValue: number;
}
