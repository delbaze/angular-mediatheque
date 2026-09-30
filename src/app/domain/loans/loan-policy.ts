// src/app/domain/loans/loan-policy.ts
import { inject, Service } from '@angular/core';
import { NOW } from '@core/config/clock';
import { LOAN_RULES } from '@domain/loans/loan-rules';
import { Loan } from '@domain/loans/models';
import { Member } from '@domain/members/models';

@Service()
export class LoanPolicy {
  private readonly rules = inject(LOAN_RULES, { optional: true }) ?? [];
  private readonly now = inject(NOW);

  /** Renvoie les messages des règles violées. Un tableau vide autorise l'emprunt. */
  check(member: Member, bookId: string, memberLoans: Loan[]): string[] {
    const ctx = {
      member,
      bookId,
      activeLoans: memberLoans.filter((loan) => loan.returnedAt === null),
      now: this.now(),
    };
    return this.rules
      .map((rule) => rule(ctx))
      .filter((message): message is string => message !== null);
  }
}
