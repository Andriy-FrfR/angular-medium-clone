import { AuthService } from 'src/app/shared/services/auth.service';
import { ArticleResponse } from './../../shared/interfaces/article-response.interface';
import { Article } from './../../shared/interfaces/article.interface';
import { ArticlesService } from './../../shared/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  article!: Article;

  constructor(
    private articlesServ: ArticlesService,
    private route: ActivatedRoute,
    public authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.articlesServ
          .getArticleBySlug(params['slug'])
          .subscribe((res: ArticleResponse) => {
            this.article = res.article;
          });
      },
    });
  }
}
