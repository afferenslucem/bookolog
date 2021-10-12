import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getRequestLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class LoggerInterceptor implements HttpInterceptor {
  private logger = getRequestLogger('Log');

  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();

    return next.handle(req).pipe(
      tap(data => {
        if (data instanceof HttpResponse) {
          const endTime = Date.now();
          this.logger.info(`url: ${req.url}, time: ${endTime - startTime}ms`);
        }
      }),
    );
  }
}
