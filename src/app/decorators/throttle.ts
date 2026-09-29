/**
 * Exécute immédiatement le premier appel, puis ignore les appels suivants pendant intervalMs.
 * L'état est conservé par instance. Un appel ignoré renvoie undefined.
 */
export function Throttle(intervalMs: number) {
  return function (target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    const lastCalls = new WeakMap<object, number>();

    descriptor.value = function (this: object, ...args: unknown[]) {
      const now = Date.now();
      const last = lastCalls.get(this);
      if (last !== undefined && now - last < intervalMs) {
        return undefined;
      }
      lastCalls.set(this, now);
      return original.apply(this, args);
    };

    return descriptor;
  };
}