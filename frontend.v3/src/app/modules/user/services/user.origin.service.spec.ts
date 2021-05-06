import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserOriginService } from './user.origin.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CredentialsException } from '../../auth/exceptions/credentials.exception';

describe('UserOriginService', () => {
  let origin: UserOriginService;
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    origin = TestBed.inject(UserOriginService);
    client = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(origin).toBeTruthy();
  });

  describe('login', () => {
    it('should send request', async () => {
      const postSpy = spyOn(client, 'post').and.returnValue(of(null));

      await origin.login({
        login: 'hrodvitnir',
        password: 'qwerty',
      });

      expect(postSpy).toHaveBeenCalledOnceWith(
        '/auth/login',
        {
          login: 'hrodvitnir',
          password: 'qwerty',
        },
        jasmine.any(Object),
      );
    });

    it('should wrap error', async () => {
      const postSpy = spyOn(client, 'post').and.returnValue(throwError({ error: 'Incorrect login or password' }));

      try {
        await origin.login({
          login: 'hrodvitnir',
          password: 'qwerty',
        });

        expect({}).toBeFalsy();
      } catch (e) {
        expect(e).toBeInstanceOf(CredentialsException);
      }
    });

    it('should throw error', async () => {
      const postSpy = spyOn(client, 'post').and.returnValue(throwError({ error: 'Unexpected error' }));

      try {
        await origin.login({
          login: 'hrodvitnir',
          password: 'qwerty',
        });

        expect({}).toBeFalsy();
      } catch (e) {
        expect(e).toEqual({ error: 'Unexpected error' });
      }
    });
  });

  it('logout', async () => {
    const getSpy = spyOn(client, 'get').and.returnValue(of(null));

    await origin.logout();

    expect(getSpy).toHaveBeenCalledOnceWith('/auth/logout');
  });

  it('loadMe', async () => {
    const getSpy = spyOn(client, 'get').and.returnValue(of(null));

    await origin.loadMe();

    expect(getSpy).toHaveBeenCalledOnceWith('/user/me');
  });

  it('registration', async () => {
    const getSpy = spyOn(client, 'post').and.returnValue(of(null));

    await origin.registration({
      email: 'alexshakirov74@gmail.com',
      login: 'hrodvitnir',
      password: 'qwerty',
    });

    expect(getSpy).toHaveBeenCalledOnceWith('/auth/register', {
      email: 'alexshakirov74@gmail.com',
      login: 'hrodvitnir',
      password: 'qwerty',
    });
  });

  it('recoveryPassword', async () => {
    const getSpy = spyOn(client, 'post').and.returnValue(of(null));

    await origin.recoveryPassword('alexshakirov74@gmail.com');

    expect(getSpy).toHaveBeenCalledOnceWith('/auth/recoverPassword', 'alexshakirov74@gmail.com', jasmine.any(Object));
  });

  it('passwordChange', async () => {
    const postSpy = spyOn(client, 'post').and.returnValue(of(null));

    await origin.passwordChange('qwerty', 'uiop');

    expect(postSpy).toHaveBeenCalledOnceWith('/auth/changePassword', {
      oldPassword: 'qwerty',
      newPassword: 'uiop',
    });
  });

  it('changeEmail', async () => {
    const getSpy = spyOn(client, 'post').and.returnValue(of(null));

    await origin.changeEmail('alexshakirov74@gmail.com');

    expect(getSpy).toHaveBeenCalledOnceWith('/user/changeEmail', 'alexshakirov74@gmail.com', jasmine.any(Object));
  });

  it('synchronize', async () => {
    const getSpy = spyOn(client, 'post').and.returnValue(of(null));

    await origin.synchronize({} as any);

    expect(getSpy).toHaveBeenCalledOnceWith('/user/Synchronize', {} as any);
  });

  it('restore', async () => {
    const getSpy = spyOn(client, 'get').and.returnValue(of(null));

    await origin.restore();

    expect(getSpy).toHaveBeenCalledOnceWith('/user/loadAll');
  });
});
