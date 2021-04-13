import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { getConsoleLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class TimeoutInterceptor implements HttpInterceptor {
  private logger = getConsoleLogger({
    loggerName: 'TimeoutInterceptor',
    namespace: 'Interceptor',
  });

  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(req.headers.get('timeout')) || 20 * 1000;

    return next.handle(req).pipe(timeout(timeoutValue));
  }
}
