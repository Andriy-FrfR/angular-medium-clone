import { HttpErrorResponse } from '@angular/common/http';
import { TagsResponse } from './../../../../shared/interfaces/tags-response.interface';
import { TagsService } from './../../../../shared/services/tags.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() tagClickEvent = new EventEmitter<string>();
  tags: string[] = [];
  loading = false;

  constructor(private tagsServ: TagsService) {}

  ngOnInit(): void {
    this.loading = true;

    this.tagsServ.getTags().subscribe({
      next: (res: TagsResponse) => {
        this.tags = res.tags;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  tagClickHandler(tag: string): void {
    this.tagClickEvent.emit(tag);
  }
}
