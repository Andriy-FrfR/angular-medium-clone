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

  constructor(
    public authServ: AuthService,
    private articlesServ: ArticlesService
  ) {}

  ngOnInit(): void {
    this.articlesServ.getGlobalFeed().subscribe({
      next: (res: ArticlesResponse) => {
        this.articles = res.articles;
      },
    });
  }
}
