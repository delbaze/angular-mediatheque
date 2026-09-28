export function Debounce(delay = 300) {
  return function (_: object, __: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    const timers = new WeakMap<object, ReturnType<typeof setTimeout>>();
    // let timer : ReturnType<typeof setTimeout>;

    descriptor.value = function (this: object, ...args: unknown[]) {
      // clearTimeout(timer);
      // timer = setTimeout(() => original.apply(this, args), delay);
      clearTimeout(timers.get(this));
      timers.set(
        this,
        setTimeout(() => original.apply(this, args), delay),
      );
    };

    return descriptor;
  };
}
