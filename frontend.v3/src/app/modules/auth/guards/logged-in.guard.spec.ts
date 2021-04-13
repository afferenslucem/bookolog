import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  let user: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(LoggedInGuard);
    user = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should pass user', () => {
    user.user = {
      id: 1,
      login: 'login',
      avatarName: '',
      email: 'alexshakirov74@gmail.com',
      lastSyncTime: new Date(),
    };

    const result = guard.canActivateChild();

    expect(result).toBeTrue();
  });

  it('should redirect user', () => {
    // @ts-ignore
    user._user = null;

    const parseSpy = spyOn(router, 'parseUrl');
    guard.canActivateChild();

    expect(parseSpy).toHaveBeenCalledOnceWith('/login');
  });
});
