// src/app/decorators/decorator-injector.ts
import { EnvironmentProviders, inject, Injector, provideAppInitializer, ProviderToken } from '@angular/core';

let rootInjector: Injector | null = null;

/** À ajouter dans app.config.ts pour que les décorateurs puissent accéder aux services. */
export function provideDecoratorInjector(): EnvironmentProviders {
  return provideAppInitializer(() => {
    rootInjector = inject(Injector);
  });
}

/** Récupère un service depuis l'injecteur racine. À appeler au moment de l'exécution, jamais à la décoration. */
export function decoratorInject<T>(token: ProviderToken<T>): T {
  if (!rootInjector) {
    throw new Error('provideDecoratorInjector() doit être ajouté dans app.config.ts');
  }
  return rootInjector.get(token);
}