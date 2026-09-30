import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BookApi, BookHttpApi } from '@domain/books/book-api';
import { API_BASE_URL } from '../../config/api-base-url';

export interface MediathequeConfig {
  apiBaseUrl?: string;
  ///
}

export function provideMediatheque(config: MediathequeConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: API_BASE_URL, useValue: config.apiBaseUrl ?? '/api'},
    { provide: BookApi, useClass: BookHttpApi },
  ]);
}
