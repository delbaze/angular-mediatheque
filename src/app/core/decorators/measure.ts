import { isDevMode } from '@angular/core';

/**
 * Mesure la durée d'exécution d'une méthode et de l'afficher dans la console
 */
export function Measure(label?: string) {
  return function (_: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const orignal = descriptor.value as (...args: unknown[]) => unknown;
    const name = label ?? key;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      if (!isDevMode()) {
        return orignal.apply(this, args);
      }

      const start = performance.now();

      const log = () =>
        console.debug(`[Measure] ${name} : ${(performance.now() - start).toFixed(2)}ms`);

      let result: unknown;

      try {
        result = orignal.apply(this, args);
      } catch (error) {
        log();
        throw error;
      }
      if (result instanceof Promise) {
        return result.finally(log);
      }

      log();
      return result;
    };
    return descriptor;
  };
}
