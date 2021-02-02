import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from '../modules/auth/interceptors/with-credentials.interceptor';
import { AuthorizedInterceptor } from './interceptors/authorized.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { OldCookiesInterceptor } from './interceptors/old-cookies.interceptor';
import { PreloaderInterceptor } from './interceptors/preloader.interceptor';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { UrlInterceptor } from './interceptors/url.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: PreloaderInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: OldCookiesInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizedInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true, },
];
