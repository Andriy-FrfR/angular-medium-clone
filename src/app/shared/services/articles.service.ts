import { ArticlesResponse } from './../interfaces/articles-response.interface';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getGlobalFeed(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(
      `${environment.apiBaseUrl}/articles`
    );
  }

  getYourFeed(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(
      `${environment.apiBaseUrl}/articles/feed`
    );
  }

  getArticlesByTag(tag: string): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(
      `${environment.apiBaseUrl}/articles?tag=${tag}`
    );
  }
}
