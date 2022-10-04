import { AuthResponse } from './../interfaces/auth-response.interface';
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

  get username(): string | null {
    return localStorage.getItem('username');
  }

  setToken(res: AuthResponse): void {
    localStorage.setItem('token', res.user.token);
  }

  setUsername(res: AuthResponse): void {
    localStorage.setItem('username', res.user.username);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  removeUsername(): void {
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/users`, {
        user: {
          username,
          email,
          password,
        },
      })
      .pipe(tap(this.setToken), tap(this.setUsername));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/users/login`, {
        user: { email, password },
      })
      .pipe(tap(this.setToken), tap(this.setUsername));
  }
}
