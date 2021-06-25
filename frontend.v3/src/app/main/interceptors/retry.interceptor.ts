import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getConsoleLogger } from '../app.logging';
import { BrokenConnectionError } from '../models/errors/broken-connection-error';
import { error } from 'ng-packagr/lib/utils/log';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptor implements HttpInterceptor {
  private logger = getConsoleLogger({
    loggerName: 'ErrorLogger',
    namespace: 'Interceptor',
  });

  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.trySendRequest(req, next, 3);
  }

  private trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.logger.error('error.message', err.message);
        this.logger.error('error.status', err.status);
        this.logger.error('error.statusText', err.statusText);
        if (err.status === 0 && count > 1) {
          const newReq = req.clone();
          return this.trySendRequest(newReq, next, count - 1);
        } else if (+err?.status < 400 || +err.status === 0) {
          return throwError(new BrokenConnectionError());
        } else {
          return throwError(err);
        }
      }),
    );
  }
}
