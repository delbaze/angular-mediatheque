import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { BookApi, BookHttpApi } from '@domain/books/book-api';
import { API_BASE_URL } from '../../config/api-base-url';
import { BOOK_BADGES, lastCopy, newRelease, readersFavorite } from '@domain/books/books-badges';
import { LOAN_RULES, maxLoans, noLateLoan, notTwice } from '@domain/loans/loan-rules';
import { Member } from '@domain/members/models';
import { FEATURES } from './features';

export interface MediathequeConfig {
  apiBaseUrl?: string;
  newReleaseDays?: number;
  /** Plafond d'emprunts en cours par catégorie d'adhérent */
  maxLoans?: Record<Member['category'], number>;
  features?: string[];
}

export function provideMediatheque(config: MediathequeConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: API_BASE_URL, useValue: config.apiBaseUrl ?? '/api' },
    { provide: BookApi, useClass: BookHttpApi },
    { provide: BOOK_BADGES, useValue: lastCopy, multi: true },
    { provide: BOOK_BADGES, useValue: readersFavorite, multi: true },
    { provide: BOOK_BADGES, useValue: newRelease(config.newReleaseDays ?? 60), multi: true },
    { provide: LOAN_RULES, useValue: noLateLoan, multi: true },
    { provide: LOAN_RULES, useValue: notTwice, multi: true },
    {
      provide: LOAN_RULES,
      useValue: maxLoans(config.maxLoans ?? { adulte: 5, jeune: 3 }),
      multi: true,
    },
    {
        provide: FEATURES,
        useValue: config.features ?? [],
    }
  ]);
}
