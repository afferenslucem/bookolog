import { TimeoutInterceptor } from './timeout.interceptor';

describe('TimeoutInterceptor', () => {
  it('should create an instance', () => {
    expect(new TimeoutInterceptor(null)).toBeTruthy();
  });

  describe('getTimeout', () => {
    it('should return 25000 for online', () => {
      const interceptor = new TimeoutInterceptor({ mode: 'online' } as any);

      const time = interceptor.getTimeout();
      const expected = 25000;

      expect(time).toEqual(expected);
    });

    it('should return 40000 for slowConnection', () => {
      const interceptor = new TimeoutInterceptor({ mode: 'slowConnection' } as any);

      const time = interceptor.getTimeout();
      const expected = 30000;

      expect(time).toEqual(expected);
    });

    it('should return 30000 for offline', () => {
      const interceptor = new TimeoutInterceptor({ mode: 'offline' } as any);

      const time = interceptor.getTimeout();
      const expected = 15000;

      expect(time).toEqual(expected);
    });
  });
});
