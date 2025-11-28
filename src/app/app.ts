import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { GlobalSpinner } from './common/components/global-spinner/global-spinner';
import { SharedModule } from './common/module/shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [SharedModule, RouterModule, GlobalSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Angular20-Prac');

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  navigationLink = [
    { path: 'investments-list', name: 'Investments List', icon: 'list_alt' },
    { path: 'find-my-investment', name: 'Find Investment', icon: 'search' },
    { path: 'add-investment', name: 'Add Investment', icon: 'add_circle' },
    { path: 'delete-investment', name: 'Delete Investment', icon: 'remove_circle' },
    { path: 'update-investment', name: 'Edit Investment', icon: 'edit' },
    { path: 'investments', name: 'Investments Overview', icon: 'insights' },
  ];
}
