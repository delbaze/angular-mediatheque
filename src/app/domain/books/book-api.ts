import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Author, Book } from './models';
import { Log } from '@core/decorators/log';
import { API_BASE_URL } from '../../config/api-base-url';

@Service() // approche moderne pour du singleton root
// @Injectable({providedIn: 'root'})
export class BookApi {

    // constructor(private http: HttpClient){}
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