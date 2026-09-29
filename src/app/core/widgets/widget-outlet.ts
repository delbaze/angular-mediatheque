import { NgComponentOutlet } from '@angular/common';
import { Component, input, resource } from '@angular/core';
import { WidgetDef } from './widgets-token';

@Component({
  selector: 'app-widget-outlet',
  imports: [NgComponentOutlet],
  template: `
    @if (component.hasValue()) {
      <ng-container *ngComponentOutlet="component.value()" />
    } @else if (component.isLoading()) {
      <p>Chargement...</p>
    } @else if (component.error()) {
      <p>Widget indisponible</p>
    }
  `,
})
export class WidgetOutlet {
  readonly def = input.required<WidgetDef>();

  protected readonly component = resource({
    params: () => this.def(),
    loader: ({ params: def }) =>
      def.loadComponent ? def.loadComponent() : Promise.resolve(def.component),
  });
}
