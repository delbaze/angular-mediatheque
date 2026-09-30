import { Routes } from '@angular/router';
import { featureGuard } from '@core/config/features';
import { provideWidget } from '@core/widgets/widgets-token';
import { LateLoansWidget } from '@features/dashboard/widgets/late-loans-widget';
import { NewBooksWidget } from '@features/dashboard/widgets/new-books-widget';
// import { TodayLoansWidget } from '@features/dashboard/widgets/today-loans-widget';

export const routes: Routes = [
  {
    path: 'emprunts',
    loadComponent: () => import('@features/loans/pages/loan-list-page'),
    data: { preload: true },
  },
  {
    path: 'adherents/:id',
    loadComponent: () => import('@features/loans/pages/member-detail-page'),
  },
  {
    path: 'dashboard',
    canMatch: [featureGuard('dashboard')],
    loadComponent: () => import('@features/dashboard/pages/dashboard-page'),
    providers: [
      provideWidget({
        id: 'new-books',
        title: 'Nouveautés',
        order: 1,
        loadComponent: () =>
          import('@features/dashboard/widgets/new-books-widget').then((m) => m.NewBooksWidget),
      }),
      provideWidget({
        id: 'late-loans',
        title: 'Retards',
        order: 2,
        roles: ['librarian'],
        loadComponent: () =>
          import('@features/dashboard/widgets/late-loans-widget').then((m) => m.LateLoansWidget),
      }),
      provideWidget({
        id: 'today-loans',
        title: 'Emprunts du jour',
        order: 3,
        roles: ['librarian'],
        loadComponent: () =>
          import('@features/dashboard/widgets/today-loans-widget').then((m) => m.TodayLoansWidget),
      }),
    ],
  },
  {
    path: '',
    loadChildren: () => import('@features/catalog/catalog.routes'),
  },
  { path: '**', redirectTo: '' },
];
