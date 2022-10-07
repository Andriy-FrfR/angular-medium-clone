import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  @Input('articles') articles: Article[] = [];
  @Input('loading') loading = false;

  constructor() {}
}