import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTAuthenticationInterceptor } from '../modules/auth/interceptors/jwt-authentication.interceptor';
import { WithCredentialsInterceptor } from '../modules/auth/interceptors/with-credentials.interceptor';
import { AuthorizedInterceptor } from './interceptors/authorized.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { PreloaderInterceptor } from './interceptors/preloader.interceptor';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { PingInterceptor } from './interceptors/ping.interceptor';
import { BrokenConnectionInterceptor } from './interceptors/broken-connection.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: PreloaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizedInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JWTAuthenticationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BrokenConnectionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
];
