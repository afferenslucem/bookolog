import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class OldCookiesInterceptor implements HttpInterceptor {
  private logger = getLogger({
    loggerName: 'OldCookiesInterceptor',
    namespace: 'Interceptor',
  });

  public constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.trySendRequest(req, next, 2);
  }

  private trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409 && count > 1) {
          this.logger.warn('retry');
          const newReq = req.clone();
          return this.trySendRequest(newReq, next, count - 1);
        } else {
          return throwError(err);
        }
      }),
      timeout(250),
    );
  }
}
