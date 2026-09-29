import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { registeredWidgets } from './widgets/widget-registry';
import "./widgets/widgets"

@Component({
  selector: 'app-dashboard',
  imports: [NgComponentOutlet],
  template: `
    <h1>Tableau de bord</h1>
    @for (w of widgets; track w.meta.id) {
      <section>
        <h2>{{ w.meta.title }}</h2>
        <ng-container *ngComponentOutlet="w.component" />
      </section>
    }
  `,
})
export class DashboardPage {
  protected readonly widgets = registeredWidgets();
}
