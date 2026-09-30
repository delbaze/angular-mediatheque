import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { LoanApi } from '@domain/loans/loan-api';
import { Member } from '@domain/members/models';
import { Loan } from '@domain/loans/models';
import { Throttle } from '@core/decorators/throttle';
import { API_BASE_URL } from '../../../config/api-base-url';
import { LoanPolicy } from '@domain/loans/loan-policy';
import { BorrowForm } from '../ui/borrow-form';

export interface BorrowDraft {
  bookId: string;
}

@Component({
  selector: 'app-member-detail',
  imports: [DatePipe, BorrowForm],
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
      @for (message of violations(); track message) {
        <p>{{ message }}</p>
      }
      <app-borrow-form
        [disabled]="violations().length > 0"
        (submitted)="borrow($event)"
        /* (bookIdChange)="bookId.set($event)" */
        [(draft)]="draft"

      />
    } @else if (member.isLoading()) {
      <p>Chargement...</p>
    } @else if (member.error()) {
      <p>Adhérent introuvable.</p>
    }
  `,
})
export default class MemberDetailPage {
  private readonly api = inject(LoanApi);
  private readonly policy = inject(LoanPolicy);
  private readonly baseUrl = inject(API_BASE_URL);
  protected readonly draft = signal<BorrowDraft>({ bookId: '' });

  readonly id = input.required<string>();
  protected readonly member = httpResource<Member>(() => `${this.baseUrl}/members/${this.id()}`);
  protected readonly loans = httpResource<Loan[]>(
    () => ({ url: `${this.baseUrl}/loans`, params: { memberId: this.id() } }),
    { defaultValue: [] },
  );
  protected readonly message = signal('');
  protected readonly bookId = signal('');

  protected readonly violations = computed(() =>
    this.member.hasValue()
      ? this.policy.check(this.member.value(), this.bookId(), this.loans.value())
      : [],
  );

  @Throttle(500)
  borrow(bookId: string) {
    const from = new Date();
    const due = new Date(from);
    due.setDate(due.getDate() + 21);

    const loan: Loan = {
      bookId,
      memberId: this.id(),
      from: from.toISOString().slice(0, 10),
      due: due.toISOString().slice(0, 10),
      returnedAt: null,
    };
    this.api.borrow(loan).subscribe(() => {
      this.message.set('Emprunt enregistré.');
      this.loans.reload(); // réactualisation de la liste des emprunts (avec le nouvel emprunt)
    });
  }
}
