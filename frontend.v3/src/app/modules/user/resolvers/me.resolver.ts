import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { getConsoleLogger } from '../../../main/app.logging';
import { User } from '../../auth/models/user';
import { UserService } from '../services/user.service';

@Injectable({providedIn: 'root'})
export class MeResolver implements Resolve<User> {
  private logger = getConsoleLogger({
    loggerName: 'MeResolver',
    namespace: 'Resolver',
  });

  public constructor(private userService: UserService) {
  }

  public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    try {
      const user = await this.userService.loadMe();

      return user;
    } catch (e) {
      return this.userService.user;
    }
  }
}
