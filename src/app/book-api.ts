import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Author, Book } from './models';
import { Log } from './decorators/log';

@Service() // approche moderne pour du singleton root
// @Injectable({providedIn: 'root'})
export class BookApi {

    // constructor(private http: HttpClient){}
  private readonly http = inject(HttpClient); // approche moderne


  @Log('catalogue')
  getAll(genre?: string) {
    return this.http.get<Book[]>('/api/books', { params: genre ? { genre } : {} });
  }

  getById(id: string) {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  getAuthor(id: string) {
    return this.http.get<Author>(`/api/authors/${id}`);
  }
}