import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification';
import _ from 'declarray';

@Injectable({
  providedIn: 'root'
})
export class NotificationQueueService {
  private _notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() { }

  public add(notifications: Notification): void {
    const next = _(this.notifications).append(notifications).toArray();

    this._notifications$.next(next);
  }

  public remove(guid: string): void {
    const next = _(this.notifications).where(item => item.guid !== guid).toArray();

    this._notifications$.next(next);
  }

  public get notifications$(): Observable<Notification[]> {
    return this._notifications$;
  }

  public get notifications(): Notification[] {
    return this._notifications$.getValue();
  }
}
