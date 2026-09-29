import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoanApi } from '../loan-api';
import { LoanStats } from '../loan-stats';
import { Widget } from './widget-registry';

@Widget({ id: 'late-loans', title: 'Retards', order: 2, roles: ['librarian'] })
@Component({
  selector: 'app-late-loans-widget',
  template: `<p>
    {{ stats().late }} emprunt(s) en retard, soit {{ stats().lateRate }} % des emprunts en cours
  </p>`,
})
export class LateLoansWidget {
  private readonly loans = toSignal(inject(LoanApi).getAll(), { initialValue: [] });
  private readonly statsService = inject(LoanStats);
  protected readonly stats = computed(() => this.statsService.compute(this.loans()));
}
