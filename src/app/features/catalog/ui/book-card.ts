import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../domain/books/models';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <h2 data-testid="title">
        <a [routerLink]="['/livres', book().id]">{{ book().title }}</a>
      </h2>
      <p>{{ book().year }}</p>

      @if (badges().length > 0) {
        <ul>
          @for (badge of badges(); track badge) {
            <li>{{ badge }}</li>
          }
        </ul>
      }
      @if (book().available === 0) {
        <span>Indisponible</span>
      }
      @if (!favorite()) {
        <button type="button" data-testid="favorite" (click)="addFavorite.emit(book().id)">
          Ajouter au favoris
        </button>
      }
    </article>
  `,
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly favorite = input(false);
  readonly addFavorite = output<string>();
  readonly badges = input.required<string[]>();
}
