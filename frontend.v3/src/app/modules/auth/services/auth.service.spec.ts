import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('login', async () => {
    const loginSpy = spyOn(userService, 'login');

    await authService.login({
      login: 'hrodvitnir',
      password: 'qwerty',
    });

    expect(loginSpy).toHaveBeenCalledOnceWith({
      login: 'hrodvitnir',
      password: 'qwerty',
    });
  });

  it('logout', async () => {
    const logoutSpy = spyOn(userService, 'logout');

    await authService.logout();

    expect(logoutSpy).toHaveBeenCalledOnceWith();
  });

  it('registration', async () => {
    const registrationSpy = spyOn(userService, 'registration');

    await authService.registration({
      password: 'qwerty',
      login: 'hrodvitnir',
      email: 'alexshakirov74@gmail.com',
    });

    expect(registrationSpy).toHaveBeenCalledOnceWith({
      password: 'qwerty',
      login: 'hrodvitnir',
      email: 'alexshakirov74@gmail.com',
    });
  });

  it('recoveryPassword', async () => {
    const recoverySpy = spyOn(userService, 'recoveryPassword');

    await authService.recoveryPassword('alexshakirov74@gmail.com');

    expect(recoverySpy).toHaveBeenCalledOnceWith('alexshakirov74@gmail.com');
  });

  it('changePassword', async () => {
    const changeSpy = spyOn(userService, 'changePassword');

    await authService.changePassword('qwerty', 'uiop');

    expect(changeSpy).toHaveBeenCalledOnceWith('qwerty', 'uiop');
  });
});
