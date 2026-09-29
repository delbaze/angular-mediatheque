import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: ` <div class="modal">
    <p>{{ data.message }}</p>
    <button (click)="close(true)">Confirmer</button>
    <button (click)="close(false)">Annuler</button>
  </div>`,
})
export class ConfirmDialogComponent {
  protected readonly data = inject<{ message: string }>(DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef<boolean>);

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
