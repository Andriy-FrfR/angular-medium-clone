import { ProfileService } from './../../shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  updateUserForm = new FormGroup({
    picture: new FormControl(this.authServ.currentUser?.image),
    username: new FormControl(this.authServ.currentUser?.username),
    bio: new FormControl(this.authServ.currentUser?.bio),
    email: new FormControl(this.authServ.currentUser?.email),
    password: new FormControl(null),
  });

  loading = false;

  constructor(
    private authServ: AuthService,
    private profileServ: ProfileService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;

    const updateData = {
      picture: this.updateUserForm.get('picture')?.value,
      username: this.updateUserForm.get('username')?.value,
      bio: this.updateUserForm.get('bio')?.value,
      email: this.updateUserForm.get('email')?.value,
      password: this.updateUserForm.get('password')?.value,
    };

    this.profileServ.updateUser(updateData).subscribe({
      next: () => {
        this.authServ.logout();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
