// src/app/domain/loans/loan-status.ts
import { toIsoDate } from '@shared/util/iso-date';
import { Loan } from '@domain/loans/models';

/** Un emprunt est en retard s'il n'est pas rendu et que son échéance est passée. Le jour de l'échéance, il ne l'est pas encore. */
export function isLate(loan: Loan, now: Date): boolean {
  return loan.returnedAt === null && loan.due < toIsoDate(now);
}