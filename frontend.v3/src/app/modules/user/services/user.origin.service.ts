import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ILogger } from 'waterlog';
import { getLogger } from '../../../main/app.logging';
import { CredentialsException } from '../../auth/exceptions/credentials.exception';
import { Credentials } from '../../auth/models/credentials';
import { User } from '../../auth/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserOriginService {
  private logger: ILogger = getLogger('UserOriginService');

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

  public async me(): Promise<User> {
    try {
      return await this.httpClient.get<User>('/user/me').pipe(
        tap((user) => this.logger.debug('Me', user)),
      ).toPromise();
    } catch (e) {
      this.logger.error('me problem', e);
      throw e;
    }
  }
}