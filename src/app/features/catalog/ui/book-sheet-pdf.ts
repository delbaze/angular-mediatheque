import { Service } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Book } from '@domain/books/models';

@Service()
export class BookSheetPdf {
  download(book: Book, authorName = '') {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(book.title, 20, 30);
    doc.text(`${authorName}, ${book.year}`, 20, 42);
    doc.text(`ISBN : ${book.isbn}`, 20, 52);
    doc.text(`Exemplaires : ${book.available} disponible(s) sur ${book.copies}`, 20, 62);
    doc.save(`fiche-${book.id}.pdf`);
  }
}
