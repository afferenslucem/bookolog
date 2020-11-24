import { Injectable } from '@angular/core';
import { UserService } from '../../../main/services/user.service';
import { BookService } from '../../book/services/book.service';
import { CredentialsException } from '../exceptions/credentials.exception';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { getLogger } from '../../../main/app.logging';
import { ILogger } from 'waterlog';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logger: ILogger = getLogger('AuthService');

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private bookService: BookService,
  ) {
  }

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.sendLogin(credentials);
    await this.bookService.loadAll();
    return user;
  }

  private async sendLogin(credentials: Credentials): Promise<User> {
    try {
      return await this.httpClient.post<User>('/auth/login', credentials, {
        responseType: 'json',
      }).pipe(
        tap((response) => this.logger.debug('Sent login', response)),
        tap((user: User) => this.userService.user = user),
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
      await this.sendLogout();
    } finally {
      await this.userService.logout();
      await this.bookService.clear();
    }
  }

  private async sendLogout(): Promise<void> {
    try {
      return await this.httpClient.get('/auth/logout').pipe(
        tap(() => this.logger.debug('Sent logout')),
      ).toPromise() as Promise<void>;
    } catch (e) {
      this.logger.error('Logout problem');
      throw e;
    }
  }
}
