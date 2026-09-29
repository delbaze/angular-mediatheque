import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BookApi } from '../book-api';
import { Widget } from './widget-registry';

// @Widget({ id: 'new-books', title: 'Nouveautés', order: 1 })
@Component({
  selector: 'app-new-books-widget',
  imports: [RouterLink],
  template: `
    <ul>
      @for (book of latest(); track book.id) {
        <li>
          <a [routerLink]="['/livres', book.id]">{{ book.title }}</a>
        </li>
      }
    </ul>
  `,
})
export class NewBooksWidget {
  private readonly books = toSignal(inject(BookApi).getAll(), { initialValue: [] });

  protected readonly latest = computed(() =>
    [...this.books()].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 3),
  );
}
