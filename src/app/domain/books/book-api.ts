import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Author, Book } from './models';
import { Log } from '@core/decorators/log';
import { API_BASE_URL } from '../../config/api-base-url';
import { Observable, of, throwError } from 'rxjs';

export abstract class BookApi {
  abstract getAll(genre?: string): Observable<Book[]>;
  abstract getById(id: string): Observable<Book>;
  abstract getAuthor(id: string): Observable<Author>;
}

@Injectable()
export class BookHttpApi extends BookApi {
  private readonly http = inject(HttpClient); // approche moderne
  private readonly baseUrl = inject(API_BASE_URL);

  @Log('catalogue')
  getAll(genre?: string) {
    return this.http.get<Book[]>(`${this.baseUrl}/books`, { params: genre ? { genre } : {} });
  }

  getById(id: string) {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  getAuthor(id: string) {
    return this.http.get<Author>(`${this.baseUrl}//authors/${id}`);
  }
}

/** Implémentation en mémoire : démo hors ligne ou test */
@Injectable()
export class BookMemoryApi extends BookApi {
  private readonly books: Book[] = [
    {
      id: '1',
      title: 'Dune',
      authorId: '1',
      genre: 'sf',
      year: 1965,
      isbn: '9782266320481',
      rating: 4.6,
      copies: 2,
      available: 1,
      addedAt: '2026-09-02',
    },
    {
      id: '2',
      title: 'Fondation',
      authorId: '2',
      genre: 'sf',
      year: 1951,
      isbn: '9782070360536',
      rating: 4.3,
      copies: 2,
      available: 2,
      addedAt: '2025-11-14',
    },
    {
      id: '3',
      title: "L'Étranger",
      authorId: '3',
      genre: 'roman',
      year: 1942,
      isbn: '9782070360024',
      rating: 4.1,
      copies: 2,
      available: 1,
      addedAt: '2024-03-08',
    },
  ];

  private readonly authors: Author[] = [
    {
      id: '1',
      name: 'Frank Herbert',
    },
    {
      id: '2',
      name: 'Isaac Asimov',
    },
    {
      id: '3',
      name: 'Albert Camus',
    },
  ];

  getAll(genre?: string) {
    return of(genre ? this.books.filter((b) => b.genre === genre) : this.books);
  }

  getById(id: string) {
    const book = this.books.find((b) => b.id === id);
    return book ? of(book) : throwError(() => new Error(`Livre ${id} introuvable`));
  }
  getAuthor(id: string) {
    const author = this.authors.find((a) => a.id === id);
    return author ? of(author) : throwError(() => new Error(`Auteur ${id} introuvable`));
  }
}
// @Service() // approche moderne pour du singleton root
// // @Injectable({providedIn: 'root'})
// export class BookApi {

//     // constructor(private http: HttpClient){}
//   private readonly http = inject(HttpClient); // approche moderne
//   private readonly baseUrl = inject(API_BASE_URL);

//   @Log('catalogue')
//   getAll(genre?: string) {
//     return this.http.get<Book[]>(`${this.baseUrl}/books`, { params: genre ? { genre } : {} });
//   }

//   getById(id: string) {
//     return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
//   }

//   getAuthor(id: string) {
//     return this.http.get<Author>(`${this.baseUrl}//authors/${id}`);
//   }
// }
