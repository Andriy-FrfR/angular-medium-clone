import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AlreadyAuthenticatedGuard implements CanActivate {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authServ.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
