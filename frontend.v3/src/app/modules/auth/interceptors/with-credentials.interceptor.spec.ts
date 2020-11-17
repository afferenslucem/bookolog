import { WithCredentialsInterceptor } from './with-credentials.interceptor';
import {environment} from '../../../../environments/environment';

describe('WithCredentialsInterceptor', () => {
  it('should create an instance', () => {
    expect(new WithCredentialsInterceptor()).toBeTruthy();
  });

  it('should withCredentials', () => {
    const int = new WithCredentialsInterceptor();

    const req: any = {
      withCredentials: false,
      clone: jasmine.createSpy(),
    };

    const next = {
      handle: jasmine.createSpy(),
    };

    int.intercept(req, next);

    expect(req.clone).toHaveBeenCalledWith({
      withCredentials: true
    });

    expect(next.handle).toHaveBeenCalledTimes(1);
  });
});
