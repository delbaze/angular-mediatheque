import { Service } from '@angular/core';

@Service()
export class ConfirmService {

    ask(message: string): boolean {
      return window.confirm(message);
    }
}
