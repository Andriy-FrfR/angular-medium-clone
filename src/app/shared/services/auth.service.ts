import { AuthResponseInterface } from './../interfaces/auth-response.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  setToken(res: AuthResponseInterface): void {
    localStorage.setItem('token', res.user.token);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(`${environment.apiBaseUrl}/users`, {
        user: {
          username,
          email,
          password,
        },
      })
      .pipe(tap(this.setToken));
  }

  login(email: string, password: string): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(`${environment.apiBaseUrl}/users/login`, {
        user: { email, password },
      })
      .pipe(tap(this.setToken));
  }
}
