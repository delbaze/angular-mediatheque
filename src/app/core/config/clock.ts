import { InjectionToken } from '@angular/core';

/**
 * Horloge de l'application : une fonction qui renvoie la date courante.
 * Les tests la remplacent pour figer le temps.
 *
 * par exemple : 
 * { provide: NOW, useValue: () => new Date('2026-10-01T10:00:00') }
 */
export const NOW = new InjectionToken<() => Date>('NOW', {
  providedIn: 'root',
  factory: () => () => new Date(),
});


// // dans un test


// describe('BookBadges', () => {

//     beforeEach(() => {

//         TestBed.configureTestingModule({
//             providers: [
//                 { provide : NOW, useValue: () => new Date('2026-09-30T10:00:00Z'}
//             ]
//         })
//     }
// })