export function Log(label?: string) {
  // une fabrique de décorateur
  return function (_: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    // vraie fonction de décoration
    //target = BookApi
    // key = getAll
    // dans descriptor.value => on a la méthode originale
    const original = descriptor.value as (...args: unknown[]) => unknown;
    const name = label ?? key;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      // ici je peux faire ce que je veux avant l'appel de la méthode originale
      console.log(`[Log] ${name} appelé avec`, args);
      const result = original.apply(this, args);
      console.log(`[Log] ${name} a renvoyé`, result);
      // ici je peux faire ce que je veux après l'appel de la méthode originale
      return result;
    };
    return descriptor;
  };
}

// @Log()
// @Log('catalogue');
