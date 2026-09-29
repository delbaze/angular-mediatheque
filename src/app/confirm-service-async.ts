import { Dialog } from '@angular/cdk/dialog';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog';

@Service()
export class ConfirmServiceAsync{
  private readonly dialog = inject(Dialog);
  async ask(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open<boolean>(ConfirmDialogComponent, {
      data: { message },
      disableClose: true,
    });

    const result = await firstValueFrom(dialogRef.closed);
    return result ?? false;
  }
  //   ask(message: string): boolean {
  //     return window.confirm(message);
  //   }
}
