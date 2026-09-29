// src/app/features/loans/ui/borrow-form.ts
import { Component, input, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

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

  private readonly model = signal({ bookId: '' });
  protected readonly borrowForm = form(this.model, f => {
    required(f.bookId, { message: 'Le numéro du livre est obligatoire' });
  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.submitted.emit(this.model().bookId.trim());
    this.model.set({ bookId: '' });
  }
}