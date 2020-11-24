import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {WithCredentialsInterceptor} from '../modules/auth/interceptors/with-credentials.interceptor';
import { AuthorizedInterceptor } from './interceptors/authorized.interceptor';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import {UrlInterceptor} from './interceptors/url.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizedInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true, },
];
