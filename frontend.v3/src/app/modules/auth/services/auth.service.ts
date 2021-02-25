import { Injectable } from '@angular/core';
import { ILogger } from 'waterlog';
import { getConsoleLogger } from '../../../main/app.logging';
import { UserService } from '../../user/services/user.service';
import { Credentials } from '../models/credentials';
import { RegistrationData } from '../models/registration-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logger: ILogger = getConsoleLogger('AuthService');

  constructor(
    private userService: UserService,
  ) {
  }

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.userService.login(credentials);
    return user;
  }

  public async logout(): Promise<void> {
    try {
      await this.userService.logout();
    } finally {
    }
  }

  public async registration(regData: RegistrationData): Promise<void> {
    await this.userService.registration(regData);
  }

  public async recovery(email: string): Promise<void> {
    await this.userService.recovery(email);
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await this.userService.passwordChange(oldPassword, newPassword);
  }
}
