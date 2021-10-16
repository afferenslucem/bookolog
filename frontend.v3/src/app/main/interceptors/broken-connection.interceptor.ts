import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BrokenConnectionError } from '../models/errors/broken-connection-error';

@Injectable()
export class BrokenConnectionInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 0 || error.status === 504) {
          return throwError(new BrokenConnectionError());
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
