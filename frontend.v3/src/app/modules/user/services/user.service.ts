import {Injectable} from '@angular/core';
import {AppData} from '../../../main/models/app-data';
import {AppSyncData} from '../../../main/models/app-sync-data';
import {Credentials} from '../../auth/models/credentials';
import {RegistrationData} from '../../auth/models/registration-data';
import {User} from '../../auth/models/user';
import {UserOriginService} from './user.origin.service';
import {LocalStorageService} from '../../../main/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userOrigin: UserOriginService,
    private localStorageService: LocalStorageService,
  ) {
    this.recoverUser();
  }

  private _user: User;

  public get user(): User {
    return this._user;
  }

  public set user(v: User) {
    this._user = v;
    this.saveUser();
  }

  public get lastSyncDate(): Date {
    const lastSyncDate = this.user?.lastSyncTime;

    return lastSyncDate ? new Date(this.user.lastSyncTime) : null;
  }

  public async logout(): Promise<void> {
    try {
      await this.userOrigin.logout();
    } finally {
      this.clearStorage();
    }
  }

  public clearStorage(): void {
    this.localStorageService.clear();
    this._user = null;
  }

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.userOrigin.login(credentials);
    this.user = user;

    return user;
  }

  public async loadMe(): Promise<User> {
    const me = await this.userOrigin.loadMe();
    this.user = me;

    return me;
  }

  public async registration(regData: RegistrationData): Promise<User> {
    return await this.userOrigin.registration(regData);
  }

  public async recoveryPassword(email: string): Promise<void> {
    await this.userOrigin.recoveryPassword(email);
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await this.userOrigin.passwordChange(oldPassword, newPassword);
  }

  public async changeEmail(email: string): Promise<void> {
    await this.userOrigin.changeEmail(email);

    this.user.email = email;

    this.saveUser();
  }

  public async synchronize(data: AppSyncData): Promise<AppSyncData> {
    return await this.userOrigin.synchronize(data);
  }

  public async restore(): Promise<AppData> {
    return await this.userOrigin.restore();
  }

  public async setAvatar(avatar: File): Promise<void> {
    this.user.avatarName = await this.userOrigin.loadAvatar(avatar);
    this.saveUser();
  }

  private recoverUser(): User {
    const saved = this.localStorageService.getItem('user');

    if (!!saved && saved !== 'undefined') {
      this._user = JSON.parse(saved);

      return this._user;
    } else {
      return null;
    }
  }

  public saveUser(): void {
    this.localStorageService.setItem('user', JSON.stringify(this._user));
  }
}
