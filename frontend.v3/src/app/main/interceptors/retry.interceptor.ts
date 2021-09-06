import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { BrokenConnectionError } from '../models/errors/broken-connection-error';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptor implements HttpInterceptor {
  public constructor() {}

  private static isOffline(err: HttpErrorResponse): boolean {
    return err.status === 0 || err.status === 504;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.trySendRequest(req, next, 3);
  }

  private trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleError(err, req, next, count)));
  }

  private handleError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    if (RetryInterceptor.isOffline(err) && count > 1) {
      const newReq = req.clone();

      return of(null).pipe(
        delay(1500),
        switchMap(() => this.trySendRequest(newReq, next, count - 1)),
      );
    } else if (RetryInterceptor.isOffline(err)) {
      return throwError(new BrokenConnectionError());
    } else {
      return throwError(err);
    }
  }
}
