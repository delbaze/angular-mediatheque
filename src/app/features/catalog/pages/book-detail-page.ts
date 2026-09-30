import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { Author, Book } from '../../../domain/books/models';
import { BookApi, BookHttpApi } from '@domain/books/book-api';
import { Panel } from '@shared/ui/panel';
import { BookSheetButton } from '../ui/book-sheet-button';

@Component({
  selector: 'app-book-detail',
  template: `
    @if (book.hasValue()) {
      @let b = book.value();
      <h1>{{ b.title }}</h1>
      <p>{{ author.value()?.name }}, {{ b.year }}</p>
      <p>{{ b.available }} exemplaire(s) disponible(s) sur {{ b.copies }}</p>
      <app-panel title="Informations">
        <p>{{ author.value()?.name }}, {{ b.year }}</p>

        <app-panel title="Disponibilité">
          <p>{{ b.available }} exemplaire(s) disponible(s) sur {{ b.copies }}</p>

          <app-panel title="Identifiants">
            <p>ISBN : {{ b.isbn }}</p>
          </app-panel>
        </app-panel>
      </app-panel>
      <img loading="lazy" />
      @defer (on interaction) {
        <app-book-sheet-button [book]="b" [authorName]="author.value()?.name ?? ''" />
      } @placeholder {
        <p>Cliquez ici pour le voir</p>
      }
    } @else if (book.isLoading()) {
      <p>Chargement...</p>
    } @else if (book.error()) {
      <p>Livre introuvable.</p>
    }
  `,
  imports: [Panel, BookSheetButton],
})
export default class BookDetailPage {
  readonly id = input.required<string>();

  protected readonly book = httpResource<Book>(() => `/api/books/${this.id()}`);
  protected readonly author = httpResource<Author>(() =>
    this.book.hasValue() ? `/api/authors/${this.book.value().authorId}` : undefined,
  );
}
