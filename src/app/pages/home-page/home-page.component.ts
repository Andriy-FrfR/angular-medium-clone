import { HttpErrorResponse } from '@angular/common/http';
import { ArticlesResponse } from './../../shared/interfaces/articles-response.interface';
import { ArticlesService } from './../../shared/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

enum FeedName {
  YourFeed = 'YOUR',
  GlobalFeed = 'GLOBAL',
  TagFeed = 'TAG',
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  FeedName = FeedName;
  articles: Article[] = [];
  loading = false;
  activeFeed: FeedName = FeedName.GlobalFeed;
  activeTag = '';

  constructor(
    public authServ: AuthService,
    private articlesServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.fetchGlobalFeed();
  }

  private prepareForFetching(feed: FeedName): void {
    this.loading = true;
    this.articles = [];
    this.activeFeed = feed;
  }

  fetchYourFeed(): void {
    this.prepareForFetching(FeedName.YourFeed);

    this.articlesServ.getYourFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          this.fetchGlobalFeed();
        }
      },
    });
  }

  fetchGlobalFeed(): void {
    this.prepareForFetching(FeedName.GlobalFeed);

    this.articlesServ.getGlobalFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  fetchTagFeed(tag: string): void {
    this.prepareForFetching(FeedName.TagFeed);
    this.activeTag = tag;

    this.articlesServ.getArticlesByTag(tag).subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
      },
    });
  }

  tagClickHandler(tag: string): void {
    this.fetchTagFeed(tag);
  }
}
