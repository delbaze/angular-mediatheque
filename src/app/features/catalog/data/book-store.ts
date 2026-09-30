import { computed, inject, Service, signal } from '@angular/core';
import { API_BASE_URL } from '../../../config/api-base-url';
import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { BookApi } from '@domain/books/book-api';
import { Book } from '@domain/books/models';

@Service()
export class BookStore {
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);
//   private readonly bookApi = inject(BookApi, {});

  readonly query = signal('');
  readonly genre = signal<string | null>(null);

  protected readonly booksResource = httpResource<Book[]>(
    () => {
      const genre = this.genre();
      let params = new HttpParams();
      if (genre) {
        params = params.set('genre', genre);
      }
      return {
        url: `${this.baseUrl}/books`,
        params,
      };
    },
    { defaultValue: [] },
  );

  rate(id: string, rating: number) {
    return this.http
      .patch<Book>(`${this.baseUrl}/books/${id}`, { rating })
      .pipe(
        tap((updated) =>
          this.booksResource.update((list) => list.map((b) => (b.id === id ? updated : b))),
        ),
      );
  }

  readonly loading = this.booksResource.isLoading;
  readonly error = this.booksResource.error;

  readonly books = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.booksResource.value().filter((b) => b.title.toLowerCase().includes(q));
  });
  readonly count = computed(() => this.books().length);

  reload() {
    this.booksResource.reload();
  }
}
