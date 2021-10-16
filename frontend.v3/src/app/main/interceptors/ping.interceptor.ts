import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PingService } from '../services/ping.service';

@Injectable()
export class PingInterceptor implements HttpInterceptor {
  constructor(private ping: PingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ping = this.ping.ping();

    return from(ping).pipe(
      tap(() => this.throwIfOffline()),
      switchMap(() => next.handle(req)),
    );
  }

  private throwIfOffline(): Observable<any> {
    if (this.ping.mode === 'offline') {
      return throwError({
        status: 0,
      });
    } else {
      return null;
    }
  }
}
