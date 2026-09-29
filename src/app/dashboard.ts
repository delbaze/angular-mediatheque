import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { registeredWidgets, Role, widgetsFor } from './core/widgets/widget-registry';
import './features/dashboard/widgets/widgets';
import { WIDGETS } from './core/widgets/widgets-token';

@Component({
  selector: 'app-dashboard',
  imports: [NgComponentOutlet],
  template: `
    <h1>Tableau de bord</h1>
    <p>
      Rôle : {{ currentRole() === 'librarian' ? 'bibliothécaire' : 'lecteur' }}
      <button type="button" (click)="toggleRole()">Changer le rôle</button>
    </p>

    @for (w of visibleWidgets(); track w.id) {
      <section>
        <h2>{{ w.title }}</h2>
        <ng-container *ngComponentOutlet="w.component" />
      </section>
    }
  `,
})
export class DashboardPage {
  protected readonly currentRole = signal<Role>('reader');

  //   protected readonly widgets = computed(() => widgetsFor(this.currentRole()));
  // protected readonly widgets = registeredWidgets();
  protected readonly widgets = [...(inject(WIDGETS, { optional: true }) ?? [])].sort(
    (a, b) => a.order ?? 99 - (b.order ?? 99),
  );

  protected readonly visibleWidgets = computed(() => {
    const role = this.currentRole();
    return this.widgets.filter((w) => !w.roles || w.roles.includes(role));
  });

  toggleRole() {
    this.currentRole.update((role) => (role === 'reader' ? 'librarian' : 'reader'));
  }
}
