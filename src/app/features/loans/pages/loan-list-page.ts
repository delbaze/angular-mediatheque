import { Component, inject, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Confirm } from "@core/decorators/confirm";
import { ConfirmAsync } from "@core/decorators/confirm-async";
import { BookApi } from "@domain/books/book-api";
import { Loan } from "@domain/loans/models";
import { LoanTable } from "@features/loans/ui/loan-table";
import { LoanApi } from "../../../domain/loans/loan-api";
import { LoanStats } from "../../../domain/loans/loan-stats";

@Component({
  selector: 'app-loan-list',
  imports: [LoanTable],
  template: `
    <h1>Emprunts</h1>
    <p>
      {{ stats().active }} emprunts en cours, dont {{ stats().late }} en retard
      ({{ stats().lateRate }} %), {{ stats().returned }} rendus
    </p>
    <app-loan-table [loans]="loans()" [titles]="titles()" (giveBack)="giveBack($event)" (cancel)="cancel($event)" />
  `,
})
export default class LoanListPage {
  private readonly api = inject(LoanApi);
  private readonly statsService = inject(LoanStats);

  protected readonly loans = toSignal(this.api.getAll(), { initialValue: [] });
  private readonly books = toSignal(inject(BookApi).getAll(), { initialValue: [] });

  protected readonly titles = computed(() => new Map(this.books().map(b => [b.id, b.title])));
  protected readonly stats = computed(() => this.statsService.compute(this.loans()));

  @ConfirmAsync((loan: Loan) => `Enregistrer le retour de l'emprunt du ${new Date(loan.from).toLocaleDateString('fr-FR')} ?`)
  giveBack(loan: Loan) {
    this.api.giveBack(loan.id!).subscribe(() => location.reload());
  }

  @Confirm('Annuler définitivement cet emprunt ?')
  cancel(id: string) {
    this.api.cancel(id).subscribe(() => location.reload());
  }
}