import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrokenConnectionError } from '../models/errors/broken-connection-error';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptor implements HttpInterceptor {
  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.trySendRequest(req, next, 3);
  }

  private trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
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
