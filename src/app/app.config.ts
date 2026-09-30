import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideDecoratorInjector } from './core/decorators/decorator-injector';
import { BookApi, BookHttpApi, BookMemoryApi } from '@domain/books/book-api';
import { provideMediatheque } from '@core/config/provide-mediatheque';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()), // si vous faites /livres/:id readonly id = input.required<string>();sans avoir besoin d'injecter ActivatedRoute
    // /connexion?returnUrl=/bibliotheque => returnUrl = input.required<string>()
    // resolve: { member: memberResolver } => member = input.required<Member>();
    // data: { mode: 'lecture' } => mode = input<string>

    // sans ça vous feriez :
    // private readonly route = inject(ActivatedRoute);
    // readonly id = toSignal(this.route.paramMap.pipe(map(p => p.get('id)!)), { requireSync: true})
    provideHttpClient(),
    provideDecoratorInjector(),
    provideMediatheque({newReleaseDays: 30}),
    // { provide: BookApi, useClass: BookMemoryApi },
  ],
};
