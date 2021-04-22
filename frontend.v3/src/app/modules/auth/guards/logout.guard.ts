import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  public constructor(private auth: AuthService, private router: Router) {}

  public async canActivate(): Promise<boolean | UrlTree> {
    await this.auth.logout();
    return this.router.navigateByUrl('/');
  }
}
