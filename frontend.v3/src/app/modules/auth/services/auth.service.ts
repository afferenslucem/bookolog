import { Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { BookService } from '../../book/services/book.service';
import { CredentialsException } from '../exceptions/credentials.exception';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { getLogger } from '../../../main/app.logging';
import { ILogger } from 'waterlog';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { RegistrationData } from '../models/registration-data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logger: ILogger = getLogger('AuthService');

  constructor(
    private userService: UserService,
    private bookService: BookService,
  ) {
  }

  public async login(credentials: Credentials): Promise<User> {
    const user = await this.userService.login(credentials);
    await this.bookService.loadAll();
    return user;
  }

  public async logout(): Promise<void> {
    try {
      await this.userService.logout();
    } finally {
      await this.bookService.clear();
    }
  }

  public async registration(regData: RegistrationData): Promise<void> {
    await this.userService.registration(regData);
  }

  public async recovery(email: string): Promise<void> {
    await this.userService.recovery(email);
  }
}
