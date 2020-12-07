import { IEqualityComparer } from 'declarray';
import { Notification } from './notification';

export class NotificationEqualityComparer implements IEqualityComparer<Notification>{
  public equal(first: Notification, seconds: Notification): boolean {
    return first.guid === seconds.guid;
  }

  public getHashCode(object: Notification): string | number {
    return object.guid;
  }
}
