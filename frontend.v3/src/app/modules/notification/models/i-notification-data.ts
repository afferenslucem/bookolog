import { NotificationType } from './notification-type';

export interface INotificationData {
  guid: string;
  text: string;
  type?: NotificationType;
  timeout?: number;
}
