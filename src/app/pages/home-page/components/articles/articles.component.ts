import { Article } from './../../../../shared/interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @Input('articles') articles: Article[] = [];
  @Input('loading') loading = false;

  constructor() {}

  ngOnInit(): void {}
}
