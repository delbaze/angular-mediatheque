import { Component, computed, inject, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { BookApi } from '@domain/books/book-api';
import {} from //   CdkFixedSizeVirtualScroll,
//   CdkVirtualForOf,
//   CdkVirtualScrollViewport,
'@angular/cdk/scrolling';
import { Book } from '@domain/books/models';
import { Debounce } from '@core/decorators/debounce';
import { BookCard } from '../ui/book-card';
import { persistedSignal } from '../../../shared/util/persisted-signal';
import { BookBadges } from '@domain/books/books-badges';

@Component({
  selector: 'app-catalog',
  imports: [BookCard],

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
    <label>
      Recherche
      <input
        type="search"
        (input)="search($any($event.target).value)"
        placeholder="Rechercher un titre"
      />
    </label>

    @for (book of visibleBooks(); track book.id) {
      <!-- @for (book of manyBooks(); track book.id) { -->
      <app-book-card
        [book]="book"
        [favorite]="favorites().includes(book.id)"
        (addFavorite)="addFavorite($event)"
        [badges]="badges.badgesFor(book)"
      />
    } @empty {
      <li>Aucun livre.</li>
    }
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
export default class CatalogPage {
  private readonly api = inject(BookApi);
  protected readonly genre = signal('');
  protected readonly query = signal('');
  protected readonly trackById = (_: number, book: Book) => book.id;
  protected readonly favorites = persistedSignal<string[]>('catalog.favorites', []);

  private readonly badges = inject(BookBadges);

  protected readonly badgesById = computed(() => {
    return new Map(this.visibleBooks().map((book) => [book.id, this.badges.badgesFor(book)]));
  });

  protected readonly books = toSignal(
    // re transforme le flux RxJS en un signal books pour pouvoir le lire facilement dans le template avec books()
    toObservable(this.genre).pipe(switchMap((genre) => this.api.getAll(genre || undefined))), // switchcMap annule automatiquement la requête précédente si l'utilisateur change de genre rapidement
    { initialValue: [] },
  );

  protected readonly visibleBooks = computed(() => {
    const q = this.query().trim().toLowerCase(); // this.query est lu mais pas traqué
    // const q = untracked(() => this.query().trim().toLowerCase()); // this.query est lu mais pas traqué
    return this.books().filter((book) => book.title.toLowerCase().includes(q));
  });

  //   // pour mon test
  //   protected readonly manyBooks = computed(() =>
  //     Array.from({ length: 10_000 }, (_, i) => ({
  //       ...this.books()[i % this.books().length],
  //       id: String(i),
  //     })),
  //   );

  @Debounce(300)
  search(value: string) {
    this.query.set(value);
  }
  selectGenre(genre: string) {
    this.genre.set(genre);
  }

  addFavorite(id: string) {
    this.favorites.update((ids) => [...ids, id]);
  }
}
