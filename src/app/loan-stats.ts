import { Service } from '@angular/core';
import { Loan, LoanStatsSummary } from './domain/books/models';
import { Measure } from './core/decorators/measure';

@Service()
export class LoanStats {
  @Measure('stats')
  compute(loans: Loan[], now = new Date()): LoanStatsSummary {
    const active = loans.filter((l) => l.returnedAt === null);
    const late = active.filter((l) => new Date(l.due) < now);
    return {
      total: loans.length, // nb total emprunt
      active: active.length, // nb d'emprunts actuellement en cours
      late: late.length, // nb d'emprunt actuellement en retard
      returned: loans.length - active.length, // nb emprunts qui ont déjà été rendus
      lateRate: active.length === 0 ? 0 : Math.round((late.length / active.length) * 100), // pourcentage de retard parmi les emprunts en cours
    };
  }
}
