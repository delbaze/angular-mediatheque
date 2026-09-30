import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BookApi, BookHttpApi } from '@domain/books/book-api';
import { API_BASE_URL } from '../../config/api-base-url';
import { BOOK_BADGES, lastCopy, newRelease, readersFavorite } from '@domain/books/books-badges';

export interface MediathequeConfig {
  apiBaseUrl?: string;
  newReleaseDays?: number;
  ///
}

export function provideMediatheque(config: MediathequeConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: API_BASE_URL, useValue: config.apiBaseUrl ?? '/api' },
    { provide: BookApi, useClass: BookHttpApi },
    { provide: BOOK_BADGES, useValue: lastCopy, multi: true },
    { provide: BOOK_BADGES, useValue: readersFavorite, multi: true },
    { provide: BOOK_BADGES, useValue: newRelease(config.newReleaseDays ?? 60), multi: true },
  ]);
}
