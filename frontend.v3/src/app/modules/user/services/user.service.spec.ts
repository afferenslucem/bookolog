import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserOriginService } from './user.origin.service';
import { User } from '../../auth/models/user';

describe('UserService', () => {
  let service: UserService;
  let origin: UserOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(UserService);
    origin = TestBed.inject(UserOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('user', () => {
    it('should save user', () => {
      const spy = spyOn(service, 'saveUser');

      service.user = {
        login: 'login'
      } as any;

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setAvatar', () => {
    it('should save user',  async () => {
      const saveUserSpy = spyOn(service, 'saveUser');
      const uploadAvatarSpy = spyOn(origin, 'loadAvatar');

      // @ts-ignore
      service._user = {} as any;
      await service.setAvatar({} as any);

      expect(saveUserSpy).toHaveBeenCalledTimes(1);
      expect(uploadAvatarSpy).toHaveBeenCalledOnceWith({} as any);
    });
  });

  it('restore', async () => {
    const spy = spyOn(origin, 'restore');

    await service.restore();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('synchronize', async () => {
    const spy = spyOn(origin, 'synchronize');

    await service.synchronize({
      books: {
        delete: [],
        update: [],
      },
      collections: {
        delete: [],
        update: [],
      },
    });

    expect(spy).toHaveBeenCalledOnceWith({
      books: {
        delete: [],
        update: [],
      },
      collections: {
        delete: [],
        update: [],
      },
    });
  });

  it('changeEmail',  async () => {
    const saveUserSpy = spyOn(service, 'saveUser');
    const changeEmailSpy = spyOn(origin, 'changeEmail');
    // @ts-ignore
    service._user = {} as User;

    await service.changeEmail('alexshakirov74@gmail.com');

    expect(saveUserSpy).toHaveBeenCalledTimes(1);
    expect(changeEmailSpy).toHaveBeenCalledOnceWith('alexshakirov74@gmail.com');
    expect(service.user.email).toEqual('alexshakirov74@gmail.com');
  });

  it('passwordChange',  async () => {
    const passwordChangeSpy = spyOn(origin, 'passwordChange');

    await service.changePassword('qwerty', 'uiop');

    expect(passwordChangeSpy).toHaveBeenCalledOnceWith('qwerty', 'uiop');
  });

  it('registration',  async () => {
    const registrationSpy = spyOn(origin, 'registration');

    await service.registration({
      email: 'alexshakirov74@gmail.com',
      login: 'hrodvitnir',
      password: 'qwerty',
    });

    expect(registrationSpy).toHaveBeenCalledOnceWith({
      email: 'alexshakirov74@gmail.com',
      login: 'hrodvitnir',
      password: 'qwerty',
    });
  });

  it('loadMe',  async () => {
    const saveUserSpy = spyOn(service, 'saveUser');
    const loadMeSpy = spyOn(origin, 'loadMe');

    await service.loadMe();

    expect(saveUserSpy).toHaveBeenCalledTimes(1);
    expect(loadMeSpy).toHaveBeenCalledOnceWith();
  });

  it('login',  async () => {
    const saveUserSpy = spyOn(service, 'saveUser');
    const loginSpy = spyOn(origin, 'login');

    await service.login({
      login: 'hrodvitnir',
      password: 'qwerty'
    });

    expect(saveUserSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledOnceWith({
      login: 'hrodvitnir',
      password: 'qwerty'
    });
  });

  it('logout',  async () => {
    const clearStorageSpy = spyOn(service, 'clearStorage');
    const logoutSpy = spyOn(origin, 'logout');

    await service.logout();

    expect(clearStorageSpy).toHaveBeenCalledOnceWith();
    expect(logoutSpy).toHaveBeenCalledOnceWith();
  });
});
