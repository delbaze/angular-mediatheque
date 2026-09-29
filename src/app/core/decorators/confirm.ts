import { ConfirmService } from "../../confirm-service";
import { decoratorInject } from "./decorator-injector";


/**
 * Demande une confirmation avant d'exécuter la méthode.
 * Si l'utilisateur refuse, la méthode n'est pas appelée et renvoie undefined.
 *
 * @param message Texte de la question, ou fonction qui le construit à partir des arguments de la méthode.
 */
export function Confirm<Args extends unknown[]>(message: string | ((...args: Args) => string)) {
  return function (target: object, key: string, descriptor: TypedPropertyDescriptor<(...args: Args) => unknown>) {
    const original = descriptor.value!;

    descriptor.value = function (this: unknown, ...args: Args) {
      const text = typeof message === 'function' ? message(...args) : message;
      if (!decoratorInject(ConfirmService).ask(text)) {
        return undefined;
      }
      return original.apply(this, args);
    };

    return descriptor;
  };
}
