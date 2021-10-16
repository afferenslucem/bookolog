import { TestBed } from '@angular/core/testing';

import { BrokenConnectionInterceptor } from './broken-connection.interceptor';
import { BrokenConnectionError } from '../models/errors/broken-connection-error';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

describe('BrokenConnectionInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BrokenConnectionInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: BrokenConnectionInterceptor = TestBed.inject(BrokenConnectionInterceptor);

    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    it('should catch status 0', done => {
      const interceptor = new BrokenConnectionInterceptor();

      const next = {
        handle: () => throwError({ status: 0 }),
      } as any;

      interceptor
        .intercept(null, next)
        .pipe(
          catchError(error => {
            expect(error).toBeInstanceOf(BrokenConnectionError);
            done();

            return of();
          }),
        )
        .subscribe();
    });

    it('should catch status 504', done => {
      const interceptor = new BrokenConnectionInterceptor();

      const next = {
        handle: () => throwError({ status: 504 }),
      } as any;

      interceptor
        .intercept(null, next)
        .pipe(
          catchError(error => {
            expect(error).toBeInstanceOf(BrokenConnectionError);
            done();

            return of();
          }),
        )
        .subscribe();
    });

    it('should throw for another status', done => {
      const interceptor = new BrokenConnectionInterceptor();

      const next = {
        handle: () => throwError({ status: 403 }),
      } as any;

      interceptor
        .intercept(null, next)
        .pipe(
          catchError(error => {
            expect(error).not.toBeInstanceOf(BrokenConnectionError);
            done();

            return of();
          }),
        )
        .subscribe();
    });
  });
});
