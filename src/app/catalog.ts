import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { BookApi } from './book-api';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  template: `
    <h1>Catalogue</h1>
    <label>
      Genre
      <select (change)="selectGenre($any($event.target).value)">
        <option value="">Tous</option>
        <option value="roman">Roman</option>
        <option value="sf">Science-fiction</option>
        <option value="policier">Policier</option>
      </select>
    </label>
    <ul>
      @for (book of books(); track book.id) {
        <li>
          <a [routerLink]="['/livres', book.id]">{{ book.title }}</a> ({{ book.year }})
          @if (book.available === 0) {
            <strong>indisponible</strong>
          }
        </li>
      } @empty {
        <li>Aucun livre.</li>
      }
    </ul>
  `,
})
export class CatalogPage {
  private readonly api = inject(BookApi);
  protected readonly genre = signal('');

  protected readonly books = toSignal( // re transforme le flux RxJS en un signal books pour pouvoir le lire facilement dans le template avec books()
    toObservable(this.genre).pipe(switchMap(genre => this.api.getAll(genre || undefined))), // switchcMap annule automatiquement la requête précédente si l'utilisateur change de genre rapidement
    { initialValue: [] },
  );

  selectGenre(genre: string) {
    this.genre.set(genre);
  }
}