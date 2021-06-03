import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  public closeAll$: Observable<void>;
  public navigated$: Observable<void>;
  public open$: Observable<void>;

  private _closeAll$ = new Subject<void>();
  private _open$ = new Subject<void>();

  constructor(private router: Router) {
    this.closeAll$ = this._closeAll$.asObservable();
    this.open$ = this._open$.asObservable();
    this.navigated$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mapTo(null),
    );
  }

  public open(): void {
    this._open$.next();
  }

  public closeAll(): void {
    this._closeAll$.next();
  }
}
