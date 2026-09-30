// src/app/domain/loans/loan-rules.ts
import { InjectionToken } from '@angular/core';
import { isLate } from '@domain/loans/loan-status';
import { Loan } from '@domain/loans/models';
import { Member } from '@domain/members/models';

export interface LoanContext {
  member: Member;
  bookId: string;
  /** Emprunts non rendus de l'adhérent. */
  activeLoans: Loan[];
  now: Date;
}

/** Renvoie un message si la règle est violée, sinon null */
export type LoanRule = (ctx: LoanContext) => string | null;

export const LOAN_RULES = new InjectionToken<LoanRule[]>('LOAN_RULES');

export const noLateLoan: LoanRule = ({ activeLoans, now }) =>
  activeLoans.some((loan) => isLate(loan, now))
    ? 'Un emprunt est en retard : il doit être rendu avant tout nouvel emprunt.'
    : null;

export const notTwice: LoanRule = ({ activeLoans, bookId }) =>
  activeLoans.some((loan) => loan.bookId === bookId)
    ? 'Ce livre est déjà emprunté par cet adhérent.'
    : null;

export function maxLoans(limits: Record<Member['category'], number>): LoanRule {
  return ({ member, activeLoans }) => {
    const limit = limits[member.category];
    return activeLoans.length >= limit
      ? `Plafond atteint : ${limit} emprunts en cours au maximum.`
      : null;
  };
}
