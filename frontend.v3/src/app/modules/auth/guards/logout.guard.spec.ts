import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { LogoutGuard } from './logout.guard';

describe('LogoutGuard', () => {
  let guard: LogoutGuard;
  let user: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(LogoutGuard);
    user = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect user', () => {
    const parseSpy = spyOn(router, 'parseUrl');
    user.user = {
      id: 1,
      login: 'login',
      avatarName: '',
      email: 'alexshakirov74@gmail.com',
      lastSyncTime: new Date(),
    };

    guard.canActivateChild();

    expect(parseSpy).toHaveBeenCalledOnceWith('/in-progress');
  });

  it('should pass user', () => {
    // @ts-ignore
    user._user = null;

    const result = guard.canActivateChild();

    expect(result).toBeTrue();
  });
});
