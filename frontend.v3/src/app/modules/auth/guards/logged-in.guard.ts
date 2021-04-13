import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivateChild {
  public constructor(private user: UserService, private router: Router) {}

  canActivateChild(): boolean | UrlTree {
    if (this.user.user) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
