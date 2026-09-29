import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BookApi } from './book-api';
import { LoanApi } from './loan-api';
import { LoanStats } from './loan-stats';
import { Loan } from './models';
import { Confirm } from './decorators/confirm';
import { ConfirmAsync } from './decorators/confirm-async';

@Component({
  selector: 'app-loan-list',
  imports: [RouterLink, DatePipe],
  template: `
    <h1>Emprunts</h1>
    <p>
      {{ stats().active }} emprunts en cours, dont {{ stats().late }} en retard ({{
        stats().lateRate
      }}
      %), {{ stats().returned }} rendus
    </p>
    <table>
      <tr>
        <th>Livre</th>
        <th>Adhérent</th>
        <th>Emprunté le</th>
        <th>À rendre le</th>
        <th></th>
      </tr>
      @for (loan of loans(); track loan.id) {
        <tr>
          <td>{{ titles().get(loan.bookId) }}</td>
          <td>
            <a [routerLink]="['/adherents', loan.memberId]">{{ loan.memberId }}</a>
          </td>
          <td>{{ loan.from | date }}</td>
          <td>{{ loan.due | date }}</td>
          <td>
            @if (loan.returnedAt === null) {
              <button type="button" (click)="giveBack(loan)">Retour</button>
            } @else {
              Rendu le {{ loan.returnedAt | date }}
            }
            <button type="button" (click)="cancel(loan.id!)">Annuler</button>
          </td>
        </tr>
      }
    </table>
  `,
})
export class LoanListPage {
  private readonly api = inject(LoanApi);
  private readonly statsService = inject(LoanStats);
  //   private readonly bookApi= inject(BookApi);
  private readonly ping = inject(LoanApi).ping(); // pour tester le cas "Promise" du décorateur

  protected readonly loans = toSignal(this.api.getAll(), { initialValue: [] });
  private readonly books = toSignal(inject(BookApi).getAll(), { initialValue: [] });

  protected readonly titles = computed(() => new Map(this.books().map((b) => [b.id, b.title]))); // [ [ '1', 'Dune'] , ['2', 'Fondation' ]]
  // titles.get('1') me retournera 'Dune' par exemple; => O(1)
  // ça évite de faire sans cette Map un O(N)  =>  books().find(b => b.id === loan.bookId)?.title
  protected readonly stats = computed(() => this.statsService.compute(this.loans()));

  @ConfirmAsync(
    (loan: Loan) =>
      `Enregistrer le retour de l'emprunt du ${new Date(loan.from).toLocaleDateString('fr-FR')} ?`,
  )
  giveBack(loan: Loan) {
    this.api.giveBack(loan.id!).subscribe(() => location.reload()); // dette technique volontaire!
  }

  @Confirm('Annuler definitivement cet emprunt?')
  cancel(id: string) {
    this.api.cancel(id).subscribe(() => location.reload());
  }
}
