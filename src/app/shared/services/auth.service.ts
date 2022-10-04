import { User } from './../interfaces/user.interface';
import { UserResponse } from './../interfaces/user-response.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser!: User | null;

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  setToken(res: UserResponse): void {
    localStorage.setItem('token', res.user.token);
  }

  setUser(res: UserResponse): void {
    this.currentUser = res.user;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  removeCurrentUser(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${environment.apiBaseUrl}/users`, {
        user: {
          username,
          email,
          password,
        },
      })
      .pipe(tap(this.setToken), tap(this.setUser.bind(this)));
  }

  login(email: string, password: string): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${environment.apiBaseUrl}/users/login`, {
        user: { email, password },
      })
      .pipe(tap(this.setToken), tap(this.setUser.bind(this)));
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${environment.apiBaseUrl}/user`, {
        headers: { skipAuthInterceptor: 'skip' },
      })
      .pipe(tap(this.setUser.bind(this)));
  }
}
