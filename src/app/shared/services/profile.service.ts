import { ProfileResponse } from './../interfaces/profile-response.interface';
import { UpdateUser } from './../interfaces/update-user.interface';
import { User } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(username: string): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(
      `${environment.apiBaseUrl}/profiles/${username}`
    );
  }

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

  updateUser(updateUser: UpdateUser): Observable<User> {
    return this.http.put<User>(`${environment.apiBaseUrl}/user`, {
      user: updateUser,
    });
  }
}
