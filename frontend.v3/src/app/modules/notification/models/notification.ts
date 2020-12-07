import { INotificationData } from './i-notification-data';
import { NotificationType } from './notification-type';

export class Notification {
  guid: string;
  text: string;
  type?: NotificationType;
  timeout?: number;

  public constructor(data: INotificationData) {
    this.guid = data.guid;
    this.text = data.text;
    this.type = data.type || NotificationType.Info;
    this.timeout = data.timeout;
  }

  public get autoclose(): boolean {
    return !!this.timeout;
  }
}
