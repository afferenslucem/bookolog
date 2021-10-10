import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PingService } from '../services/ping.service';

@Injectable()
export class PingInterceptor implements HttpInterceptor {
  constructor(private ping: PingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('ping')) {
      return next.handle(req);
    } else {
      const ping = this.ping.ping();

      return from(ping).pipe(switchMap(() => next.handle(req)));
    }
  }
}
