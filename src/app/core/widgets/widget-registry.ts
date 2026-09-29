import { Type } from '@angular/core';

export type Role = 'reader' | 'librarian';

export interface WidgetMeta {
  id: string;
  title: string;
  order?: number;
  /** Rôles autorisés. Si absent : widget visible par tous */
  roles?: Role[];
}

export interface WidgetEntry {
  meta: WidgetMeta;
  component: Type<unknown>;
}

const registry = new Map<string, WidgetEntry>();

export function Widget(meta: WidgetMeta) {
  return function <T extends Type<unknown>>(target: T): T {
    if (registry.has(meta.id)) {
      throw new Error(`Widget "${meta.id}" déclaré 2 fois`);
    }
    registry.set(meta.id, { meta, component: target });
    return target;
  };
}

export function widgetsFor(role: Role): WidgetEntry[] {
  return registeredWidgets().filter((w) => !w.meta.roles || w.meta.roles.includes(role));
}
export function registeredWidgets(): WidgetEntry[] {
  return [...registry.values()].sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}
