import { AuthResponseInterface } from './../interfaces/auth-response.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(
      `${environment.apiBaseUrl}/users`,
      {
        user: {
          username,
          email,
          password,
        },
      }
    );
  }

  login(email: string, password: string): Observable<AuthResponseInterface> {
    return this.http.post<AuthResponseInterface>(
      `${environment.apiBaseUrl}/users/login`,
      { user: { email, password } }
    );
  }
}
