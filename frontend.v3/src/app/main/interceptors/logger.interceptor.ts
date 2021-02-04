import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
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
    const id = counter++;

    this.logger.debug(`Request ${id}`, req.method, req.url, `withCredentials: ${req.withCredentials}`)
    return next.handle(req).pipe(
      tap((data) => {
        if (data instanceof HttpResponse) {
          this.logger.info(`Response ${id}`, data.url, data.status, data.body)
        } else if (data instanceof HttpErrorResponse) {
          this.logger.error(`Response ${id}`, data.url, data.status, data.error)
        }
      })
    )
  }
}
