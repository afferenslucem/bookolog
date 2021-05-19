import { IEqualityComparator } from 'declarray';
import { Notification } from './notification';
import { DefaultComparator } from 'declarray/dist/utils/default-comparator';

export class NotificationEqualityComparator implements IEqualityComparator<Notification> {
  public equals(first: Notification, second: Notification): boolean {
    return first.guid === second.guid;
  }

  public compare(first: Notification, second: Notification): number {
    return new DefaultComparator().compare(first.guid, second.guid);
  }

  public getHashCode(object: Notification): number {
    return new DefaultComparator().getHashCode(object.guid);
  }
}
