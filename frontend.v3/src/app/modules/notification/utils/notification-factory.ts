import { UUIDGenerator } from 'essents';
import { environment } from '../../../../environments/environment';
import { INotificationData } from '../models/i-notification-data';
import { INotificationOptions } from '../models/i-notification-options';
import { Notification } from '../models/notification';
import { NotificationType } from '../models/notification-type';

export class NotificationFactory {
  private guidGenerator = new UUIDGenerator();

  public createInfoNotification(text: string, options?: INotificationOptions): Notification {
    return this.createNotification(text, NotificationType.Info, options);
  }

  public createWarningNotification(text: string, options?: INotificationOptions): Notification {
    return this.createNotification(text, NotificationType.Warning, options);
  }

  public createErrorNotification(text: string, options?: INotificationOptions): Notification {
    return this.createNotification(text, NotificationType.Error, options);
  }

  public createNotification(text: string, type: NotificationType, options?: INotificationOptions): Notification {
    const autoclose = options?.autoclose == null ? true : options?.autoclose || false;

    const data: INotificationData = {
      guid: this.guidGenerator.generate(),
      text,
      type,
      timeout: autoclose ? options?.timeout || environment.notificationCloseTime : null,
    };

    return new Notification(data);
  }
}
