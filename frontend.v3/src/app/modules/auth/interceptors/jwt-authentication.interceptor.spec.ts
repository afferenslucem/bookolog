import { JWTAuthenticationInterceptor } from './jwt-authentication.interceptor';
import { LocalStorageService } from '../../../main/services/local-storage.service';
import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JWTDefaults } from '../models/jwt-defaults';

describe('JWTAuthenticationInterceptor', () => {
  let interceptor: JWTAuthenticationInterceptor = null;
  let storage: LocalStorageService = null;
  let handler: HttpHandler = null;
  let req: any = {};

  beforeEach(async () => {
    interceptor = TestBed.inject(JWTAuthenticationInterceptor);
    storage = TestBed.inject(LocalStorageService);

    handler = {
      handle: (req: HttpRequest<any>) => new Subject(),
    };
  });

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should intercept with access token', done => {
      const accessHandler = new Subject<HttpEvent<any>>();

      const sendWithAccessSpy = spyOn(interceptor, 'sendWithAccess').and.returnValue(accessHandler);
      const sendWithRefreshSpy = spyOn(interceptor, 'sendWithRefresh');

      interceptor.intercept(req, handler).subscribe(() => {
        expect(sendWithAccessSpy).toHaveBeenCalledOnceWith(req, handler);
        expect(sendWithRefreshSpy).not.toHaveBeenCalledWith(req, handler);

        done();
      });

      const result = 'result' as any;
      accessHandler.next(result);
    });

    it('should intercept with refresh token', done => {
      const accessHandler = new Subject<HttpEvent<any>>();
      const refreshHandler = new Subject<HttpEvent<any>>();

      const sendWithAccessSpy = spyOn(interceptor, 'sendWithAccess').and.returnValue(accessHandler);
      const sendWithRefreshSpy = spyOn(interceptor, 'sendWithRefresh').and.returnValue(refreshHandler);

      interceptor.intercept(req, handler).subscribe(() => {
        expect(sendWithAccessSpy).toHaveBeenCalledOnceWith(req, handler);
        expect(sendWithRefreshSpy).toHaveBeenCalledOnceWith(req, handler);

        done();
      });

      accessHandler.error({
        error: null,
        status: 401,
      });
      const result = 'result' as any;
      refreshHandler.next(result);
    });

    it('should trigger onResponse', done => {
      const interceptHandler = new Subject<HttpEvent<any>>();

      const sendSpy = spyOn(interceptor, 'sendWithAuth').and.returnValue(interceptHandler);
      const onResponseSpy = spyOn(interceptor, 'onResponse');

      const result = 'result' as any;

      interceptor.intercept(req, handler).subscribe(() => {
        expect(sendSpy).toHaveBeenCalledOnceWith(req, handler);
        expect(onResponseSpy).toHaveBeenCalledOnceWith(result);

        done();
      });

      interceptHandler.next(result);
    });
  });

  it('sendWithAccess', () => {
    const getItemSpy = spyOn(storage, 'getItem').and.returnValue('access');
    const sendWithTokenSpy = spyOn(interceptor, 'sendWithToken');

    interceptor.sendWithAccess(req, handler);

    expect(getItemSpy).toHaveBeenCalledOnceWith(JWTDefaults.accessHeader);
    expect(sendWithTokenSpy).toHaveBeenCalledOnceWith(req, handler, 'access');
  });

  it('sendWithRefresh', () => {
    const getItemSpy = spyOn(storage, 'getItem').and.returnValue('refresh');
    const sendWithTokenSpy = spyOn(interceptor, 'sendWithToken');

    interceptor.sendWithRefresh(req, handler);

    expect(getItemSpy).toHaveBeenCalledOnceWith(JWTDefaults.refreshHeader);
    expect(sendWithTokenSpy).toHaveBeenCalledOnceWith(req, handler, 'refresh');
  });
});
