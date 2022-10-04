import { Router } from '@angular/router';
import { ArticlesService } from './../../services/articles.service';
import { Article } from './../../interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-article-button',
  templateUrl: './delete-article-button.component.html',
  styleUrls: ['./delete-article-button.component.scss'],
})
export class DeleteArticleButtonComponent implements OnInit {
  @Input('article') article!: Article;
  loading = false;

  constructor(private articleServ: ArticlesService, private router: Router) {}

  ngOnInit(): void {}

  deleteArticle(): void {
    this.loading = true;

    this.articleServ.deleteArticle(this.article.slug).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
