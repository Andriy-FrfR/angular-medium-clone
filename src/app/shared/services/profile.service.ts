import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../interfaces/profile-response.interface';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  followUser(username: string): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(
      `${environment.apiBaseUrl}/profiles/${username}/follow`,
      {}
    );
  }

  unfollowUser(username: string): Observable<ProfileResponse> {
    return this.http.delete<ProfileResponse>(
      `${environment.apiBaseUrl}/profiles/${username}/follow`
    );
  }
}