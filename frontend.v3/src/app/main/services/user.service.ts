import { Injectable } from '@angular/core';
import { User } from '../../modules/auth/models/user';
import { BookService } from '../../modules/book/services/book.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
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

  public logout(): void {
    localStorage.removeItem('user');
    this._user = null;
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
