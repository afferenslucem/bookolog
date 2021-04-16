import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  public constructor(private auth: AuthService) {}

  public async canActivate(): Promise<boolean | UrlTree> {
    await this.auth.logout();
    return true;
  }
}
