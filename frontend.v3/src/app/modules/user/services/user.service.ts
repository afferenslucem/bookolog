import { Injectable } from '@angular/core';
import { Credentials } from '../../auth/models/credentials';
import { RegistrationData } from '../../auth/models/registration-data';
import { User } from '../../auth/models/user';
import { BookService } from '../../book/services/book.service';
import { UserOriginService } from './user.origin.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public userOrigin: UserOriginService) {
    this.recoverUser();
  }

  private _user: User;

  public get user(): User {
    return this._user;
  }

  public set user(v: User) {
    this._user = v;

    localStorage.setItem('user', JSON.stringify(this._user));
  }

  public get lastSyncDate(): Date {
    return new Date(this.user.lastSyncTime);
  }

  public async logout(): Promise<void> {
    try {
      await this.userOrigin.logout();
    } finally {
      localStorage.removeItem('user');
      this._user = null;
    }
  }

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.userOrigin.login(credentials);
    this.user = user;

    return user;
  }

  public async loadMe(): Promise<User> {
    const me = await this.userOrigin.me();
    this.user = me;

    return me;
  }

  public async registration(regData: RegistrationData): Promise<User> {
    return await this.userOrigin.registration(regData);
  }

  public async recovery(email: string): Promise<void> {
    await this.userOrigin.recovery(email);
  }

  private recoverUser(): User {
    const saved = localStorage.getItem('user');

    if (!!saved && saved !== 'undefined') {
      this._user = JSON.parse(saved);

      return this._user;
    } else {
      return null;
    }
  }
}
