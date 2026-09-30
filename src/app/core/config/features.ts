import { InjectionToken, inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const FEATURES = new InjectionToken<string[]>('FEATURES');
// export const FEATURES = new InjectionToken<string[]>('FEATURES', {
//   providedIn: 'root',
//   factory: () => ['dashboard'],
// });

export function featureGuard(feature: string): CanMatchFn {
  return () => inject(FEATURES).includes(feature);
}
