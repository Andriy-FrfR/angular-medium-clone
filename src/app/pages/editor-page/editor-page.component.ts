import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleResponse } from './../../shared/interfaces/article-response.interface';
import { ArticlesService } from './../../shared/services/articles.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
  articleForm!: FormGroup;
  error!: HttpErrorResponse;
  loading = false;

  constructor(private articleServ: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      body: new FormControl(null),
      tagList: new FormControl(null),
    });
  }

  articleFormSubmit(): void {
    this.loading = true;

    const title = this.articleForm.get('title')?.value;
    const description = this.articleForm.get('description')?.value;
    const body = this.articleForm.get('body')?.value;
    let tagList = this.articleForm.get('tagList')?.value;

    if (tagList) {
      tagList = tagList.split(' ').filter((tag: string) => !!tag);
    }

    this.articleServ
      .createArticle(title, description, body, tagList)
      .subscribe({
        next: (res: ArticleResponse) =>
          this.router.navigate([`/article/${res.article.slug}`]),
        error: (httpErr: HttpErrorResponse) => {
          this.error = httpErr;
          this.loading = false;
        },
      });
  }
}
