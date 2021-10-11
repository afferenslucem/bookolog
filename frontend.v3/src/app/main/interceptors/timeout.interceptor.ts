import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { PingService } from '../services/ping.service';

@Injectable({
  providedIn: 'root',
})
export class TimeoutInterceptor implements HttpInterceptor {
  public constructor(private ping: PingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const time = this.getTimeout();
    const timeoutValue = Number(req.headers.get('timeout')) || time;

    return next.handle(req).pipe(timeout(timeoutValue));
  }

  public getTimeout(): number {
    switch (this.ping.mode) {
      case 'online':
        return 25 * 1000;
      case 'slowConnection':
        return 30 * 1000;
      case 'offline':
        return 15 * 1000;
    }
  }
}
