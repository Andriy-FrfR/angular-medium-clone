import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, Observable, Subscriber, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AlreadyAuthenticatedGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authServ.getCurrentUser().pipe(
      switchMap(() => {
        return new Observable((subscriber: Subscriber<boolean>) => {
          this.router.navigate(['/']);
          subscriber.next(false);
        });
      }),
      catchError(() => {
        return new Observable((subscriber: Subscriber<boolean>) => {
          subscriber.next(true);
        });
      })
    );
  }
}
