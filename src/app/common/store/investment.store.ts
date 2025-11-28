import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Investment } from '../models/investment.model';
import { computed, inject } from '@angular/core';
import { InvestmentService } from './investment-service';

type InvestmentState = {
  investments: Investment[];
  isLoading: boolean;
  error: string | null;
};

export const InvestmentStore = signalStore(
  { providedIn: 'root' },

  // 1 State
  withState<InvestmentState>({
    investments: [],
    isLoading: false,
    error: null,
  }),

  // 2 Derived values
  withComputed(({ investments }) => ({
    totalInvested: computed(() => investments().reduce((sum, i) => sum + i.amount, 0)),
    totalCurrent: computed(() => investments().reduce((sum, i) => sum + i.currentValue, 0)),
    totalGain: computed(() => {
      const list = investments();
      const invested = list.reduce((s, i) => s + i.amount, 0);
      const current = list.reduce((s, i) => s + i.currentValue, 0);
      return current - invested;
    }),
  })),

  // 3, Methods (no observables exposed)
  withMethods((store, service = inject(InvestmentService)) => ({
    async loadAll() {
      patchState(store, { isLoading: true, error: null });
      try {
        const data = await service.getAll();
        patchState(store, { investments: data, isLoading: false });
      } catch (error: any) {
        patchState(store, {
          error: (error as Error).message ?? 'Unknown error',
          isLoading: false,
        });
      }
    },
  })),

  // 4 LifecycleL auto load on first use
  withHooks({
    onInit: (store) => {
      store.loadAll();
    },
  })
);
