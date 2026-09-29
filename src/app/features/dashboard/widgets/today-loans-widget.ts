import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoanApi } from '../../../loan-api';
import { Widget } from '../../../core/widgets/widget-registry';

@Widget({ id: 'today-loans', title: 'Emprunts du jour', order: 3, roles: ['librarian'] })
@Component({
  selector: 'app-today-loans-widget',
  template: `
    <ul>
      @for (loan of today(); track loan.id) {
        <li>Livre {{ loan.bookId }}, adhérent {{ loan.memberId }}</li>
      } @empty {
        <li>Aucun emprunt aujourd'hui.</li>
      }
    </ul>
  `,
})
export class TodayLoansWidget {
  private readonly loans = toSignal(inject(LoanApi).getAll(), { initialValue: [] });
  private readonly todayIso = new Date().toISOString().slice(0, 10);
  protected readonly today = computed(() => this.loans().filter((l) => l.from === this.todayIso));
}
