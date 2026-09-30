import { Routes } from '@angular/router';
import { featureGuard } from '@core/config/features';
import { bookResolver } from './data/book-resolver';

export default [
  {
    path: '',
    // loadComponent: () => import('./pages/catalog-page').then((m) => m.CatalogPage),
    loadComponent: () => import('./pages/catalog-page'),
    title: 'Catalogue',
    canMatch: [featureGuard('catalog')],
  },
  {
    path: 'livres/:id',
    loadComponent: () => import('./pages/book-detail-page'),
    canMatch: [featureGuard('details')],
    resolve: { book: bookResolver },
  },
] satisfies Routes;
