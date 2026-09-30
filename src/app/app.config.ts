import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideDecoratorInjector } from './core/decorators/decorator-injector';
import { provideMediatheque } from '@core/config/provide-mediatheque';
import { FlagPreloading } from '@core/routing/flag-preloading';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withPreloading(FlagPreloading)), // si vous faites /livres/:id readonly id = input.required<string>();sans avoir besoin d'injecter ActivatedRoute
    // /connexion?returnUrl=/bibliotheque => returnUrl = input.required<string>()
    // resolve: { member: memberResolver } => member = input.required<Member>();
    // data: { mode: 'lecture' } => mode = input<string>

    // sans ça vous feriez :
    // private readonly route = inject(ActivatedRoute);
    // readonly id = toSignal(this.route.paramMap.pipe(map(p => p.get('id)!)), { requireSync: true})
    provideHttpClient(),
    provideDecoratorInjector(),
    provideMediatheque({
      newReleaseDays: 30,
      maxLoans: { adulte: 1, jeune: 1 },
      features: ['dashboard', 'catalog', 'details'],
    }),
    // { provide: BookApi, useClass: BookMemoryApi },
  ],
};
