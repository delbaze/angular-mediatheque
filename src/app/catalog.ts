import { Component,  inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { BookApi } from './book-api';
import {
//   CdkFixedSizeVirtualScroll,
//   CdkVirtualForOf,
//   CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { Book } from './models';



@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  
//   imports: [RouterLink, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf],
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
      <!-- @for (book of manyBooks(); track book.id) { -->
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
    <!-- <cdk-virtual-scroll-viewport itemSize="32" class="viewport">
        <table>
            <thead><tr><th>Livre</th><th>Auteur</th></tr></thead>
            <tbody>
                <tr *cdkVirtualFor="let book of manyBooks(); trackBy: trackById" class="row">
                  <td>{{book.title}}</td>
                  <td>{{book.authorId}}</td>
                </tr>

            </tbody>
        </table>
    </cdk-virtual-scroll-viewport> -->
  `,
  styles: `
    .viewport {
      height: 100px;
    }
    .row {
      height: 32px;
      display: flex;
      align-items: 'center; gap: 0.5rem;';
    }
  `,
})
export class CatalogPage {
  private readonly api = inject(BookApi);
  protected readonly genre = signal('');
  protected readonly trackById = (_: number, book: Book) => book.id;

  protected readonly books = toSignal(
    // re transforme le flux RxJS en un signal books pour pouvoir le lire facilement dans le template avec books()
    toObservable(this.genre).pipe(switchMap((genre) => this.api.getAll(genre || undefined))), // switchcMap annule automatiquement la requête précédente si l'utilisateur change de genre rapidement
    { initialValue: [] },
  );

//   // pour mon test
//   protected readonly manyBooks = computed(() =>
//     Array.from({ length: 10_000 }, (_, i) => ({
//       ...this.books()[i % this.books().length],
//       id: String(i),
//     })),
//   );

  selectGenre(genre: string) {
    this.genre.set(genre);
  }
}


