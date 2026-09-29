// src/app/widgets/widgets-token.ts
import { InjectionToken, Provider, Type } from '@angular/core';

export type Role = 'reader' | 'librarian';

export interface WidgetDef {
  id: string;
  title: string;
  order?: number;
  roles?: Role[];
  component: Type<unknown>;
}

/** Widgets du tableau de bord. Chaque fournisseur en ajoute un à la liste. */
export const WIDGETS = new InjectionToken<WidgetDef[]>('WIDGETS');

/** Déclare un widget. */
export function provideWidget(def: WidgetDef): Provider {
  return { provide: WIDGETS, useValue: def, multi: true };
}
