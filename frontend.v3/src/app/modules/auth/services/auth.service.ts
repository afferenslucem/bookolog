import { Injectable } from '@angular/core';
import {Credentials} from '../models/credentials';
import {HttpClient} from '@angular/common/http';
import {getLogger} from '../../../app.logging';
import { ILogger } from 'waterlog';
import {mapTo, tap} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger: ILogger = getLogger('AuthService');

  constructor(private httpClient: HttpClient) { }

  public async login(credentials: Credentials): Promise<User> {
    return await this.httpClient.post<User>('/auth/login', credentials, {
      responseType: 'json'
    }).pipe(
      tap((response) => this.logger.debug('Sent login', response)),
    ).toPromise();
  }
}
