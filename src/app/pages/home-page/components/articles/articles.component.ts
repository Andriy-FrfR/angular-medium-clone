import { ArticleResponse } from './../../../../shared/interfaces/article-response.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ArticlesService } from './../../../../shared/services/articles.service';
import { Article } from './../../../../shared/interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input('articles') articles: Article[] = [];
  @Input('loading') articlesLoading = false;
  loadingArticles = new WeakSet<Article>();

  constructor(
    private articlesServ: ArticlesService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleFavorited(article: Article): void {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['/register']);
      return;
    }

    this.loadingArticles.add(article);

    if (article.favorited) {
      this.articlesServ.unfavoriteArticle(article.slug).subscribe({
        next: (res: ArticleResponse) => {
          const articleIdx = this.articles.findIndex(
            (art: Article) => art.slug === article.slug
          );

          this.articles[articleIdx] = res.article;
        },
        error: () => this.loadingArticles.delete(article),
      });
    } else {
      this.articlesServ.favoriteArticle(article.slug).subscribe({
        next: (res: ArticleResponse) => {
          const articleIdx = this.articles.findIndex(
            (art: Article) => art.slug === article.slug
          );

          this.articles[articleIdx] = res.article;
        },
        error: () => this.loadingArticles.delete(article),
      });
    }
  }
}
