import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, mapTo, tap } from 'rxjs/operators';
import { getRequestLogger } from '../app.logging';
import { UrlInterceptor } from '../interceptors/url.interceptor';

type Mode = 'online' | 'offline';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  private logger = getRequestLogger('Ping');
  public mode$: BehaviorSubject<Mode> = new BehaviorSubject<Mode>('online');
  public httpClient: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  public ping(): Promise<void> {
    const startTime = Date.now();

    const url = UrlInterceptor.getServerUrl('/ping');

    return this.httpClient
      .get<string>(url, {
        headers: new HttpHeaders({
          ping: 'true',
        }),
        responseType: 'text',
      } as any)
      .pipe(
        catchError(err => {
          this.mode$.next('offline');
          return throwError(err);
        }),
        tap(() => this.mode$.next('online')),
        finalize(() => {
          const endTime = Date.now();

          this.logger.info(`time: ${endTime - startTime}ms`);
        }),
        mapTo(null),
      )
      .toPromise();
  }
}
