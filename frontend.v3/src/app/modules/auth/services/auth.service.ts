import { Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { Credentials } from '../models/credentials';
import { RegistrationData } from '../models/registration-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserService) {}

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.userService.login(credentials);
    return user;
  }

  public async logout(): Promise<void> {
    await this.userService.logout();
  }

  public async registration(regData: RegistrationData): Promise<void> {
    await this.userService.registration(regData);
  }

  public async recoveryPassword(email: string): Promise<void> {
    await this.userService.recoveryPassword(email);
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await this.userService.changePassword(oldPassword, newPassword);
  }
}
