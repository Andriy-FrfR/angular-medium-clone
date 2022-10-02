import { TagsResponseInterface } from './../../../../shared/interfaces/tags-response.interface';
import { TagsService } from './../../../../shared/services/tags.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  tags: string[] = [];
  loading = false;

  constructor(private tagsServ: TagsService) {}

  ngOnInit(): void {
    this.loading = true;

    this.tagsServ.getTags().subscribe({
      next: (res: TagsResponseInterface) => {
        this.tags = res.tags;
        this.loading = false;
      },
    });
  }
}
