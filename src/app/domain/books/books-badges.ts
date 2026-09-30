import { inject, InjectionToken, Service } from '@angular/core';
import { Book } from '@domain/books/models';

export interface BadgeContext {
  book: Book;
  now: Date;
}

export type BadgeRule = (ctx: BadgeContext) => string | null;

export const BOOK_BADGES = new InjectionToken<BadgeRule[]>('BOOK_BADGES');

export const lastCopy: BadgeRule = ({ book }) =>
  book.available === 1 ? 'Dernier exemplaire' : null;

export const readersFavorite: BadgeRule = ({ book }) =>
  book.rating >= 4.5 ? 'Coup de coeur' : null;

export function newRelease(days: number): BadgeRule {
  return ({ book, now }) => {
    const ageInDays = (now.getTime() - new Date(book.addedAt).getTime()) / 86_400_000;
    return ageInDays <= days ? 'Nouveauté' : null;
  };
}

@Service()
export class BookBadges {
  private readonly rules = inject(BOOK_BADGES, { optional: true }) ?? [];

  badgesFor(book: Book, now = new Date()): string[] {
    return this.rules
      .map((rule) => rule({ book, now }))
      .filter((label): label is string => label !== null); // type guard le predicat (label is string) indique explicitement au compilateur : "si la fonction renvoie true, alors l'élément filtré est garantie d'être de trype string" => le tableau final retourné par badgesFor est donc fortement typé en string[]
  }
}
