import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedInterceptor implements HttpInterceptor {
  private logger = getLogger({
    loggerName: 'AuthorizedInterceptor',
    namespace: 'Interceptor',
  });

  public constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        if (!err.error && err.status === 401) {
          const _ = this.router.navigate(['/login']);
        }
        this.logger.warn('error: ', err);
        return throwError(err);
      }),
    );
  }
}
