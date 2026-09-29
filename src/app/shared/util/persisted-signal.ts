// src/app/shared/util/persisted-signal.ts
import { isPlatformBrowser } from '@angular/common';
import { effect, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

/**
 * Signal dont la valeur est sauvegardée dans le localStorage et restaurée au chargement.
 * Fonction d'injection : à appeler dans un contexte d'injection (initialiseur de champ, constructeur).
 */
export function persistedSignal<T>(key: string, initial: T): WritableSignal<T> {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const stored = isBrowser ? localStorage.getItem(key) : null;
  const state = signal<T>(stored ? (JSON.parse(stored) as T) : initial);

  if (isBrowser) {
    effect(() => localStorage.setItem(key, JSON.stringify(state())));
  }
  return state;
}