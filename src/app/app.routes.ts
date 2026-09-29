import { Routes } from '@angular/router';
import { BookDetailPage } from './book-detail';
import { CatalogPage } from './catalog';
import { LoanListPage } from './loan-list';
import { MemberDetailPage } from './member-detail';
import { DashboardPage } from './dashboard';
import { provideWidget } from './widgets/widgets-token';
import { NewBooksWidget } from './widgets/new-books-widget';
import { LateLoansWidget } from './widgets/late-loans-widget';
import { TodayLoansWidget } from './widgets/today-loans-widget';

export const routes: Routes = [
  { path: '', component: CatalogPage },
  { path: 'livres/:id', component: BookDetailPage },
  { path: 'emprunts', component: LoanListPage },
  { path: 'adherents/:id', component: MemberDetailPage },
  {
    path: 'dashboard',
    component: DashboardPage,
    providers: [
    provideWidget({ id: 'new-books', title: 'Nouveautés', order: 1, component: NewBooksWidget }),
    provideWidget({ id: 'late-loans', title: 'Retards', order: 2, roles: ['librarian'], component: LateLoansWidget }),
    provideWidget({ id: 'today-loans', title: 'Emprunts du jour', order: 3, roles: ['librarian'], component: TodayLoansWidget }),
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
