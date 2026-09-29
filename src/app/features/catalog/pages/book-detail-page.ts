import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { Author, Book } from '../../../domain/books/models';

@Component({
  selector: 'app-book-detail',
  template: `
    @if (book.hasValue()) {
      @let b = book.value();
      <h1>{{ b.title }}</h1>
      <p>{{ author.value()?.name }}, {{ b.year }}</p>
      <p>{{ b.available }} exemplaire(s) disponible(s) sur {{ b.copies }}</p>
    } @else if (book.isLoading()) {
      <p>Chargement...</p>
    } @else if (book.error()) {
      <p>Livre introuvable.</p>
    }
  `,
})
export default class BookDetailPage {
  readonly id = input.required<string>();

  protected readonly book = httpResource<Book>(() => `/api/books/${this.id()}`);
  protected readonly author = httpResource<Author>(() =>
    this.book.hasValue() ? `/api/authors/${this.book.value().authorId}` : undefined,
  );
}
