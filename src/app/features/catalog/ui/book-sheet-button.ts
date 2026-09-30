import { Component, injectAsync, input, signal } from '@angular/core';
import { Book } from '@domain/books/models';

@Component({
  selector: 'app-book-sheet-button',
  template: `<button type="button" (click)="download()">Télécharger la fiche</button>`,
})
export class BookSheetButton {
  readonly book = input.required<Book>();
  readonly authorName = input('');

  protected readonly loading = signal(false);

  private readonly pdf = injectAsync(() => import('./book-sheet-pdf').then((m) => m.BookSheetPdf));

  async download() {
    this.loading.set(true);
    try {
      const generator = await this.pdf();
      generator.download(this.book(), this.authorName());
    } finally {
      this.loading.set(false);
    }
  }
}
