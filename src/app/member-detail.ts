import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { form, FormField, required,  } from '@angular/forms/signals';
import { LoanApi } from './loan-api';
import { Loan, Member } from './domain/books/models';
import { Throttle } from './core/decorators/throttle';

@Component({
  selector: 'app-member-detail',
  imports: [DatePipe, FormField],
  template: `
    @if (member.hasValue()) {
      @let m = member.value();
      <h1>{{ m.name }}</h1>
      <p>Adhérent depuis le {{ m.since | date }} ({{ m.category }})</p>

      <h2>Emprunts</h2>
      <ul>
        @for (loan of loans.value(); track loan.id) {
          <li>
            Livre {{ loan.bookId }}, à rendre le {{ loan.due | date }}
            @if (loan.returnedAt) {
              (rendu)
            }
          </li>
        } @empty {
          <li>Aucun emprunt.</li>
        }
      </ul>

      <h2>Nouvel emprunt</h2>
      <form (submit)="onSubmit($event)">
        <label>Numéro du livre <input [formField]="borrowForm.bookId" /></label>
        <button type="submit" [disabled]="borrowForm().invalid()">Emprunter</button>
      </form>
      @if (message()) {
        <p>{{ message() }}</p>
      }
    } @else if (member.isLoading()) {
      <p>Chargement...</p>
    } @else if (member.error()) {
      <p>Adhérent introuvable.</p>
    }
  `,
})
export class MemberDetailPage {
  private readonly api = inject(LoanApi);

  readonly id = input.required<string>();
  protected readonly member = httpResource<Member>(() => `/api/members/${this.id()}`);
  protected readonly loans = httpResource<Loan[]>(
    () => ({ url: '/api/loans', params: { memberId: this.id() } }),
    { defaultValue: [] },
  );
  protected readonly message = signal('');

  private readonly model = signal({ bookId: '' });
  protected readonly borrowForm = form(this.model, f => {
    required(f.bookId, { message: 'Le numéro du livre est obligatoire' });
  });

  onSubmit(domEvent: SubmitEvent) {
    domEvent.preventDefault();
    this.borrow();
  }

  @Throttle(500)
  borrow() {
    const from = new Date();
    const due = new Date(from);
    due.setDate(due.getDate() + 21);

    const loan: Loan = {
      bookId: this.model().bookId,
      memberId: this.id(),
      from: from.toISOString().slice(0, 10),
      due: due.toISOString().slice(0, 10),
      returnedAt: null,
    };
    this.api.borrow(loan).subscribe(() => {
      this.message.set('Emprunt enregistré.');
      this.model.set({ bookId: '' }); // réinitialisation de l'état du formulaire
      this.loans.reload(); // réactualisation de la liste des emprunts (avec le nouvel emprunt)
    });
  }
}