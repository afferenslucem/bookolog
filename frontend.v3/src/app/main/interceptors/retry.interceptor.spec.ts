import { RetryInterceptor } from './retry.interceptor';

describe('RetryInterceptor', () => {
  it('should create an instance', () => {
    expect(new RetryInterceptor(null)).toBeTruthy();
  });

  describe('intercept', () => {
    it('should try 3 times for good connection', () => {
      const interceptor = new RetryInterceptor({ mode: 'online' } as any);

      const spy = spyOn(interceptor, 'trySendRequest');

      interceptor.intercept(null, null);

      expect(spy).toHaveBeenCalledOnceWith(null, null, 3);
    });

    it('should try 2 times for slowConnection', () => {
      const interceptor = new RetryInterceptor({ mode: 'slowConnection' } as any);

      const spy = spyOn(interceptor, 'trySendRequest');

      interceptor.intercept(null, null);

      expect(spy).toHaveBeenCalledOnceWith(null, null, 2);
    });

    it('should try 1 time for offline', () => {
      const interceptor = new RetryInterceptor({ mode: 'offline' } as any);

      const spy = spyOn(interceptor, 'trySendRequest');

      interceptor.intercept(null, null);

      expect(spy).toHaveBeenCalledOnceWith(null, null, 1);
    });
  });
});
