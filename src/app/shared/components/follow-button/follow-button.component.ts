import { ProfileResponse } from './../../interfaces/profile-response.interface';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from './../../services/profile.service';
import { Article } from './../../interfaces/article.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input('article') article!: Article;
  loading = false;

  constructor(
    private profileServ: ProfileService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleFollow(): void {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['/register']);
      return;
    }

    this.loading = true;

    if (this.article.author.following) {
      this.profileServ.unfollowUser(this.article.author.username).subscribe({
        next: (res: ProfileResponse) => {
          Object.assign(this.article.author, res.profile);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    } else {
      this.profileServ.followUser(this.article.author.username).subscribe({
        next: (res: ProfileResponse) => {
          Object.assign(this.article.author, res.profile);
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
    }
  }
}
