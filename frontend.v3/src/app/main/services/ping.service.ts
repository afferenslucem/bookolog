import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { from, Observable, Subject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, mapTo, takeUntil, tap } from 'rxjs/operators';
import { getRequestLogger } from '../app.logging';
import { UrlInterceptor } from '../interceptors/url.interceptor';
import { Timer } from 'essents';

type Mode = 'online' | 'slowConnection' | 'offline';

enum Times {
  SlowConnection = 2000,
  Offline = 4000,
}

@Injectable({
  providedIn: 'root',
})
export class PingService {
  private logger = getRequestLogger('Ping');
  private _mode$: Subject<Mode> = new Subject<Mode>();
  private _mode: Mode;

  public mode$: Observable<Mode>;
  public get mode(): Mode {
    return this._mode;
  }

  private _isPingValid = false;
  public get isPingValid(): boolean {
    return this._isPingValid;
  }

  public httpClient: HttpClient;

  constructor(httpBackend: HttpBackend) {
    this.mode$ = this._mode$.pipe(distinctUntilChanged());
    this.mode$.subscribe(value => (this._mode = value));

    this.httpClient = new HttpClient(httpBackend);
  }

  public ping(): Promise<void> {
    if (!this.isPingValid) {
      return this.sendPing();
    } else {
      return Promise.resolve();
    }
  }

  public sendPing(): Promise<void> {
    const startTime = Date.now();
    const url = UrlInterceptor.getServerUrl('/ping');

    const [timeoutTimer, timeoutAwaiter] = this.getTimeoutTimer(Times.Offline);

    return this.httpClient
      .get<string>(url, {
        responseType: 'text',
      } as any)
      .pipe(
        tap(() => {
          timeoutTimer.kill();
          const endTime = Date.now();

          this.onRequestFinished(endTime, startTime);
        }),
        catchError(() => {
          this._mode$.next('offline');
          return throwError({
            status: 0,
          });
        }),
        takeUntil(from(timeoutAwaiter)),
        finalize(() => this.setPingValidation()),
        mapTo(null),
      )
      .toPromise();
  }

  public setPingValidation(): void {
    this._isPingValid = true;

    new Timer(() => (this._isPingValid = false), 10000).start();
  }

  public getTimeoutTimer(time: number): [Timer, Promise<any>] {
    let timeoutTimer: Timer;

    const timeoutAwaiter = new Promise(resolve => {
      timeoutTimer = new Timer(() => {
        this._mode$.next('offline');
        resolve();
      }, time).start();
    });

    return [timeoutTimer, timeoutAwaiter];
  }

  public onRequestFinished(endTime: number, startTime: number): void {
    const time = endTime - startTime;

    const mode = this.solveState(time);
    this._mode$.next(mode);

    this.logger.info(`time: ${time}ms`);
  }

  public solveState(time: number): Mode {
    if (time < Times.SlowConnection) {
      return 'online';
    } else {
      return 'slowConnection';
    }
  }
}
