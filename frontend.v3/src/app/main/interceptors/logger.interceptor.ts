import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getRequestLogger } from '../app.logging';

let counter = 0;

@Injectable({
  providedIn: 'root',
})
export class LoggerInterceptor implements HttpInterceptor {
  private logger = getRequestLogger('Log');

  public constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    counter++;

    this.logger.info(`Request ${counter}`, req.method, req.url, `withCredentials: ${req.withCredentials}`, req.body)
    return next.handle(req).pipe(
      tap((data) => {
        if (data instanceof HttpResponse) {
          this.logger.info(`Response ${counter}`, data.type, data.url, data.status, data.body)
        }
      })
    )
  }
}
