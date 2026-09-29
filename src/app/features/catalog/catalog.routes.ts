import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/catalog-page').then((m) => m.CatalogPage),
    title: 'Catalogue',
  },
  //   {
  //     path: 'livres/:id',
  //     loadComponent: () => import('./pages/book-detail-page'),
  //   },
] satisfies Routes;
