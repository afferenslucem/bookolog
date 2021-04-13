import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivateChild, CanActivate {
  public constructor(private user: UserService, private router: Router) {}

  canActivateChild(): boolean | UrlTree {
    if (!this.user.user) {
      return true;
    } else {
      return this.router.parseUrl('/in-progress');
    }
  }

  public canActivate(): boolean | UrlTree {
    if (!this.user.user) {
      return true;
    } else {
      return this.router.parseUrl('/in-progress');
    }
  }
}
