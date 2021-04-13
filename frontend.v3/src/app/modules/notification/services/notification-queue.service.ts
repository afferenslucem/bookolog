import { Injectable } from '@angular/core';
import _ from 'declarray';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationQueueService {
  constructor() {}

  private _notifications$ = new BehaviorSubject<Notification[]>([]);

  public get notifications$(): Observable<Notification[]> {
    return this._notifications$;
  }

  public get notifications(): Notification[] {
    return this._notifications$.getValue();
  }

  public add(notifications: Notification): void {
    const next = _(this.notifications).append(notifications).toArray();

    this._notifications$.next(next);
  }

  public remove(guid: string): void {
    const next = _(this.notifications)
      .where(item => item.guid !== guid)
      .toArray();

    this._notifications$.next(next);
  }
}
