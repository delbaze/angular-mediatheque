// src/app/features/loans/ui/loan-table.ts
import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Loan } from '@domain/loans/models';

@Component({
  selector: 'app-loan-table',
  imports: [DatePipe, RouterLink],
  template: `
    <table>
      <tr><th>Livre</th><th>Adhérent</th><th>Emprunté le</th><th>À rendre le</th><th></th></tr>
      @for (loan of loans(); track loan.id) {
        <tr data-testid="loan-row">
          <td>{{ titles().get(loan.bookId) ?? 'Livre ' + loan.bookId }}</td>
          <td><a [routerLink]="['/adherents', loan.memberId]">{{ loan.memberId }}</a></td>
          <td>{{ loan.from | date }}</td>
          <td>{{ loan.due | date }}</td>
          <td>
            @if (loan.returnedAt === null) {
              <button type="button" data-testid="give-back" (click)="giveBack.emit(loan)">Retour</button>
            } @else {
              Rendu le {{ loan.returnedAt | date }}
            }
            <button type="button" data-testid="cancel" (click)="cancel.emit(loan.id!)">Annuler</button>
          </td>
        </tr>
      }
    </table>
  `,
})
export class LoanTable {
  readonly loans = input.required<Loan[]>();
  readonly titles = input<Map<string, string>>(new Map());
  readonly giveBack = output<Loan>();
  readonly cancel = output<string>();
}