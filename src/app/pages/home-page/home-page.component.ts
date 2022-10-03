import { HttpErrorResponse } from '@angular/common/http';
import { ArticlesResponse } from './../../shared/interfaces/articles-response.interface';
import { ArticlesService } from './../../shared/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  activeFeed = 'global';
  activeTag = '';

  constructor(
    public authServ: AuthService,
    private articlesServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.fetchGlobalFeed();
  }

  private prepareForFetching(feed: string) {
    this.loading = true;
    this.articles = [];
    this.activeFeed = feed;
  }

  fetchGlobalFeed(): void {
    this.prepareForFetching('global');

    this.articlesServ.getGlobalFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  tagClickHandler(tag: string): void {
    this.prepareForFetching('tag');
    this.activeTag = tag;

    this.articlesServ.getArticlesByTag(tag).subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
