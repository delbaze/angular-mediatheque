// src/app/features/loans/ui/borrow-form.ts
import { Component, effect, input, output, signal, model } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { BorrowDraft } from '../pages/member-detail-page';

@Component({
  selector: 'app-borrow-form',
  imports: [FormField],
  template: `
    <form (submit)="onSubmit($event)">
      <label>Numéro du livre <input data-testid="book-id" [formField]="borrowForm.bookId" /></label>
      <button type="submit" [disabled]="borrowForm().invalid() || disabled()">Emprunter</button>
    </form>
  `,
})
export class BorrowForm {
  /** Désactive l'envoi, par exemple quand une règle d'emprunt est violée. */
  readonly disabled = input(false);
  readonly submitted = output<string>();
  readonly bookIdChange = output<string>();
  readonly draft = model<BorrowDraft>({ bookId: '' });
  // private readonly modelForm = signal({ bookId: '' });
  protected readonly borrowForm = form(this.draft, (f) => {
    required(f.bookId, { message: 'Le numéro du livre est obligatoire' });
  });

  // constructor() {
  //   effect(() => this.bookIdChange.emit(this.draft().bookId.trim()));
  // }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.submitted.emit(this.draft().bookId.trim());
    this.draft.set({ bookId: '' });
  }
}
