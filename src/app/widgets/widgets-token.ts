// src/app/widgets/widgets-token.ts
import { InjectionToken, Provider, Type } from '@angular/core';

export interface WidgetDef {
  id: string;
  title: string;
  order?: number;
  component: Type<unknown>;
}

/** Widgets du tableau de bord. Chaque fournisseur en ajoute un à la liste. */
export const WIDGETS = new InjectionToken<WidgetDef[]>('WIDGETS');

/** Déclare un widget. */
export function provideWidget(def: WidgetDef): Provider {
  return { provide: WIDGETS, useValue: def, multi: true };
}