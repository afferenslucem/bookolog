import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../main/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivateChild {
  public constructor(private user: UserService, private router: Router) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.user) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }

}
