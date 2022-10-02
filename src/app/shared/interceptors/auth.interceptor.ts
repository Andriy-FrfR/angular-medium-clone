import { AuthService } from 'src/app/shared/services/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authServ.isAuthenticated()) {
      req = req.clone({
        setHeaders: { Authorization: `Token ${this.authServ.token}` },
      });
    }

    return next.handle(req);
  }
}
