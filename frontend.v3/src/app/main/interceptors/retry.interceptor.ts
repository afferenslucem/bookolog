import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { PingService } from '../services/ping.service';

@Injectable({
  providedIn: 'root',
})
export class RetryInterceptor implements HttpInterceptor {
  public constructor(public ping: PingService) {}

  private static isOffline(err: HttpErrorResponse): boolean {
    return err.status === 0 || err.status === 504;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.ping.mode === 'online') {
      return this.trySendRequest(req, next, 3);
    } else if (this.ping.mode === 'slowConnection') {
      return this.trySendRequest(req, next, 2);
    } else {
      return this.trySendRequest(req, next, 1);
    }
  }

  public trySendRequest(req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleError(err, req, next, count)));
  }

  private handleError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler, count: number): Observable<HttpEvent<any>> {
    if (RetryInterceptor.isOffline(err) && count > 1) {
      const newReq = req.clone();

      return of(null).pipe(
        delay(250),
        switchMap(() => this.trySendRequest(newReq, next, count - 1)),
      );
    } else {
      return throwError(err);
    }
  }
}
