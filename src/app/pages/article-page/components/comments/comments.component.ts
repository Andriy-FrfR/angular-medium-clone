import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentEventName } from './../../../../shared/enums/comment-event-name.enum';
import { CommentEvent } from './../../../../shared/interfaces/comment-event.interface';
import { CommentsResponse } from './../../../../shared/interfaces/comments-response.interface';
import { Comment } from './../../../../shared/interfaces/comment.interface';
import { CommentsService } from './../../../../shared/services/comments.service';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input('article') article!: Article;
  comments: Comment[] = [];

  constructor(
    private commentsServ: CommentsService,
    public authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.commentsServ
      .getComments(this.article.slug)
      .subscribe((res: CommentsResponse) => {
        this.comments = res.comments;
      });

    this.commentsServ.comments$.subscribe((event: CommentEvent) => {
      if (event.eventName === CommentEventName.CommentAdded) {
        this.comments.push(event.comment);
      }
    });
  }

  deleteCommentHandler(comment: Comment): void {
    this.commentsServ.deleteComment(this.article.slug, comment.id).subscribe({
      next: () => {
        const commentIdx = this.comments.findIndex(
          (com: Comment) => com.id === comment.id
        );

        this.comments.splice(commentIdx, 1);
      },
    });
  }
}
