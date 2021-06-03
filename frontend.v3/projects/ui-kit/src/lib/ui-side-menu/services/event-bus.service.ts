import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  public closeAll$: Observable<void>;
  public open$: Observable<void>;
  private _closeAll$ = new Subject<void>();
  private _open$ = new Subject<void>();

  constructor() {
    this.closeAll$ = this._closeAll$.asObservable();
    this.open$ = this._open$.asObservable();
  }

  public open(): void {
    this._open$.next();
  }

  public closeAll(): void {
    this._closeAll$.next();
  }
}
