import { WithCredentialsInterceptor } from './with-credentials.interceptor';

describe('WithCredentialsInterceptor', () => {
  it('should create an instance', () => {
    expect(new WithCredentialsInterceptor()).toBeTruthy();
  });

  it('should withCredentials', () => {
    const interceptor = new WithCredentialsInterceptor();

    const req: any = {
      withCredentials: false,
      clone: jasmine.createSpy(),
    };

    const next = {
      handle: jasmine.createSpy(),
    };

    interceptor.intercept(req, next);

    expect(req.clone).toHaveBeenCalledWith({
      withCredentials: true
    });

    expect(next.handle).toHaveBeenCalledTimes(1);
  });
});
