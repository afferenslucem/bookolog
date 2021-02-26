import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ILogger } from 'waterlog';
import { getConsoleLogger } from '../../../main/app.logging';
import { AppData } from '../../../main/models/app-data';
import { AppSyncData } from '../../../main/models/app-sync-data';
import { CredentialsException } from '../../auth/exceptions/credentials.exception';
import { Credentials } from '../../auth/models/credentials';
import { RegistrationData } from '../../auth/models/registration-data';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserOriginService {
  private logger: ILogger = getConsoleLogger('UserOriginService');

  constructor(private httpClient: HttpClient) {
  }

  public async login(credentials: Credentials): Promise<User> {
    try {
      return await this.httpClient.post<User>('/auth/login', credentials, {
        responseType: 'json',
      }).pipe(
        tap((response) => this.logger.debug('Sent login', response)),
      ).toPromise();
    } catch (e) {
      if (e.error === 'Incorrect login or password') {
        this.logger.debug('Credentials error', e);
        throw new CredentialsException();
      } else {
        throw e;
      }
    }
  }

  public async logout(): Promise<void> {
    try {
      return await this.httpClient.get('/auth/logout').pipe(
        tap(() => this.logger.debug('Sent logout')),
      ).toPromise() as Promise<void>;
    } catch (e) {
      this.logger.error('Logout problem');
      throw e;
    }
  }

  public async loadMe(): Promise<User> {
    try {
      return await this.httpClient.get<User>('/user/me').pipe(
        tap((user) => this.logger.debug('Me', user)),
      ).toPromise();
    } catch (e) {
      this.logger.error('me problem', e);
      throw e;
    }
  }

  public async registration(data: RegistrationData): Promise<User> {
    return await this.httpClient.post<User>('/auth/register', data)
      .pipe(
        tap(item => this.logger.debug('Registered', item)),
      ).toPromise();
  }

  public async recoveryPassword(email: string): Promise<void> {
    await this.httpClient.get('/auth/recoverPassword/' + email).toPromise();
  }

  public async passwordChange(oldPassword: string, newPassword: string): Promise<void> {
    await this.httpClient.post('/auth/changePassword', {
      oldPassword,
      newPassword,
    }).toPromise();
  }

  public async changeEmail(email: string): Promise<void> {
    await this.httpClient.get('/user/changeEmail/' + email).toPromise();
  }

  public async loadAvatar(file: File): Promise<string> {
    const data = new FormData();
    data.append('file', file);

    const result = await this.httpClient.post('/user/uploadAvatar', data, {
      headers: {
        timeout: '60000',
      },
      responseType: 'text',
    }).toPromise();

    return result.toString();
  }

  public async synchronize(data: AppSyncData): Promise<AppSyncData> {
    const result = await this.httpClient.post<AppSyncData>('/user/Synchronize', data).toPromise();

    return result;
  }

  public async restore(): Promise<AppData> {
    const result = await this.httpClient.get<AppData>('/user/loadAll').toPromise();

    return result;
  }
}
