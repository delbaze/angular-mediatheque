// src/app/widgets/widgets-token.ts
import { InjectionToken, Provider, Type } from '@angular/core';
import { Role } from '@core/auth/role';

export interface WidgetDef {
  id: string;
  title: string;
  order?: number;
  roles?: Role[];
  component?: Type<unknown>; /// composant chargé avec la page (donc pas lazy)
  loadComponent?: () => Promise<Type<unknown>>; // chargé à la demande, lazy
}

/** Widgets du tableau de bord. Chaque fournisseur en ajoute un à la liste. */
export const WIDGETS = new InjectionToken<WidgetDef[]>('WIDGETS');

/** Déclare un widget. */
export function provideWidget(def: WidgetDef): Provider {
  return { provide: WIDGETS, useValue: def, multi: true };
}
