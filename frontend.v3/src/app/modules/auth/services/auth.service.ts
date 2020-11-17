import { Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
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
  ) {
  }

  public async login(credentials: Credentials): Promise<User> {
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
}
