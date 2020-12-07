import { Injectable } from '@angular/core';
import { Timer } from 'essents';
import { Observable } from 'rxjs';
import { INotificationOptions } from '../models/i-notification-options';
import { Notification } from '../models/notification';
import { NotificationType } from '../models/notification-type';
import { NotificationFactory } from '../utils/notification-factory';
import { NotificationQueueService } from './notification-queue.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private factory = new NotificationFactory();

  constructor(private notificationQueue: NotificationQueueService) {
  }

  public close(guid: string): void {
    this.notificationQueue.remove(guid);
  }

  public createInfoNotification(text: string, options?: INotificationOptions): void {
    this.createNotification(text, NotificationType.Info, options);
  }

  public createWarningNotification(text: string, options?: INotificationOptions): void {
    this.createNotification(text, NotificationType.Warning, options);
  }

  public createErrorNotification(text: string, options?: INotificationOptions): void {
    this.createNotification(text, NotificationType.Error, options);
  }

  public createNotification(text: string, type: NotificationType, options?: INotificationOptions): void {
    const notification = this.factory.createNotification(text, type, options);

    if (notification.autoclose) {
      this.createCloseTimer(notification.guid, notification.timeout);
    }

    this.notificationQueue.add(notification);
  }

  public createCloseTimer(guid: string, timeout: number): void {
    new Timer(() => {
      this.notificationQueue.remove(guid);
    }, timeout).start();
  }

  public get notifications$(): Observable<Notification[]> {
    return this.notificationQueue.notifications$;
  }
}
