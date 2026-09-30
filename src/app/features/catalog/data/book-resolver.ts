import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BookApi, BookHttpApi } from '@domain/books/book-api';
import { Book } from '@domain/books/models';
import { catchError, map, of } from 'rxjs';

export const bookResolver: ResolveFn<Book> = (route) => {
  const router = inject(Router);
  const id = route.paramMap.get('id')!;
  return inject(BookApi)
    .getById(id)
    .pipe(catchError(() => of(new RedirectCommand(router.parseUrl('/livre-introuvable')))));
};

/** Titre de l'onglet : "Dune | Mediatheque" */
export const bookTitleResolver: ResolveFn<string> = (route) => {
  {
    const id = route.paramMap.get('id')!;
    return inject(BookApi)
      .getById(id)
      .pipe(map((book) => `${book.title} | Mediatèque`));
  }
};
