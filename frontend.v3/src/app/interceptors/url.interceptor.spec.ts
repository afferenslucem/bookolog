import { UrlInterceptor } from './url.interceptor';
import {HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

describe('UrlInterceptor', () => {
  it('should create an instance', () => {
    expect(new UrlInterceptor()).toBeTruthy();
  });

  it('should change url', () => {
    const int = new UrlInterceptor();

    const req: any = {
      url: '/qwerty',
      clone: jasmine.createSpy(),
    };

    const next = {
      handle: jasmine.createSpy(),
    };

    int.intercept(req, next);

    expect(req.clone).toHaveBeenCalledWith({
      url: environment.serverUrl + '/qwerty'
    });

    expect(next.handle).toHaveBeenCalledTimes(1);
  });
});
