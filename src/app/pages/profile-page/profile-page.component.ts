import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileResponse } from './../../shared/interfaces/profile-response.interface';
import { Profile } from './../../shared/interfaces/profile.interface';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ProfileService } from './../../shared/services/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profile!: Profile;

  constructor(
    private profileServ: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    public authServ: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.profileServ.getProfile(params['username']).subscribe({
        next: (res: ProfileResponse) => {
          this.profile = res.profile;
        },
        error: () => {
          this.router.navigate(['/']);
        },
      });
    });
  }
}
