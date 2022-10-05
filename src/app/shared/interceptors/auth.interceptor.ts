import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authServ.token) {
      req = req.clone({
        setHeaders: { Authorization: `Token ${this.authServ.token}` },
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authServ.removeToken();
          this.authServ.removeCurrentUser();

          if (!req.headers.has('skipAuthInterceptor')) {
            this.router.navigate(['/']);
          }
        } else if (err.status === 404) {
          this.router.navigate(['/']);
        }

        return throwError(() => err);
      })
    );
  }
}
