import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;

  constructor() {
    this.recoverUser();
  }

  private recoverUser(): User {
    const saved = localStorage.getItem('user');

    if (!!saved && saved !== 'undefined') {
      this._user = JSON.parse(saved);

      return this._user;
    } else { return null; }
  }

  public set user(v: User) {
    this._user = v;

    localStorage.setItem('user', JSON.stringify(this._user));
  }

  public get user(): User {
    return this._user;
  }
}
