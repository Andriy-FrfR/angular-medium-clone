import { Article } from './../../interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ArticleResponse } from '../../interfaces/article-response.interface';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input('article') article!: Article;
  loading = false;

  constructor(
    private articlesServ: ArticlesService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleFavorited(): void {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['/register']);
      return;
    }

    this.loading = true;

    if (this.article.favorited) {
      this.articlesServ.unfavoriteArticle(this.article.slug).subscribe({
        next: (res: ArticleResponse) => {
          this.article = res.article;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    } else {
      this.articlesServ.favoriteArticle(this.article.slug).subscribe({
        next: (res: ArticleResponse) => {
          this.article = res.article;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }
}
