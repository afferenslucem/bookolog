import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getConsoleLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptor implements HttpInterceptor {
  private logger = getConsoleLogger({
    loggerName: 'RetryInterceptor',
    namespace: 'Interceptor',
  });

  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.trySendRequest(req, next, 3);
  }

  private trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0 && count > 1) {
          this.logger.warn('retry');
          const newReq = req.clone();
          return this.trySendRequest(newReq, next, count - 1);
        } else {
          return throwError(err);
        }
      }),
    );
  }
}
