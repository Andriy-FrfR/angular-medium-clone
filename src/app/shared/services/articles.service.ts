import { ArticleResponse } from './../interfaces/article-response.interface';
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

  favoriteArticle(slug: string): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/favorite`,
      {}
    );
  }

  unfavoriteArticle(slug: string): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(
      `${environment.apiBaseUrl}/articles/${slug}/favorite`
    );
  }
}
