import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivateChild {
  public constructor(private user: UserService, private router: Router) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.user.user) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
