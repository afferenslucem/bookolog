import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private httpClient: HttpClient) {}

  public async login(credentials: Credentials): Promise<User> {
    try {
      return await this.httpClient
        .post<User>('/auth/login', credentials, {
          responseType: 'json',
        })
        .toPromise();
    } catch (e) {
      if (e.error === 'Incorrect login or password') {
        throw new CredentialsException();
      } else {
        throw e;
      }
    }
  }

  public logout(): Promise<void> {
    return this.httpClient.get('/auth/logout').toPromise() as Promise<any>;
  }

  public loadMe(): Promise<User> {
    return this.httpClient.get<User>('/user/me').toPromise();
  }

  public async registration(data: RegistrationData): Promise<User> {
    return await this.httpClient.post<User>('/auth/register', data).toPromise();
  }

  public async recoveryPassword(email: string): Promise<void> {
    await this.httpClient
      .post('/auth/recoverPassword', email, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .toPromise();
  }

  public async passwordChange(oldPassword: string, newPassword: string): Promise<void> {
    await this.httpClient
      .post('/auth/changePassword', {
        oldPassword,
        newPassword,
      })
      .toPromise();
  }

  public async changeEmail(email: string): Promise<void> {
    await this.httpClient
      .post('/user/changeEmail', email, {
        headers: {
          'Content-Type': 'text/plain',
        },
        responseType: 'text',
      })
      .toPromise();
  }

  public async loadAvatar(file: File): Promise<string> {
    const data = new FormData();
    data.append('file', file);

    const result = await this.httpClient
      .post('/user/uploadAvatar', data, {
        headers: {
          timeout: '60000',
        },
        responseType: 'text',
      })
      .toPromise();

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
