
/** Précharger uniquement les routes marquées par data: { preload: true}  */

import { Service } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";


@Service()
export class FlagPreloading implements PreloadingStrategy {
     preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
        return route.data?.['preload'] ? load() : of(null)
        
    }
}