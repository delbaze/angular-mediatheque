import { Routes } from '@angular/router';
import { BookDetailPage } from './book-detail';
import { CatalogPage } from './catalog';
import { LoanListPage } from './loan-list';
import { MemberDetailPage } from './member-detail';

export const routes: Routes = [
  { path: '', component: CatalogPage },
  { path: 'livres/:id', component: BookDetailPage },
  { path: 'emprunts', component: LoanListPage },
  { path: 'adherents/:id', component: MemberDetailPage },
  { path: '**', redirectTo: '' },
];