import { NotificationEqualityComparator } from './notification-equality-comparator';

describe('NotificationEqualityComparer', () => {
  it('should create an instance', () => {
    expect(new NotificationEqualityComparator()).toBeTruthy();
  });

  it('should be equal', () => {
    const notification1 = {
      guid: 'guid',
    } as any;

    const notification2 = {
      guid: 'guid',
    } as any;

    expect(new NotificationEqualityComparator().equals(notification1, notification2)).toBeTrue();
  });

  it('should be not equal', () => {
    const notification1 = {
      guid: 'guid1',
    } as any;

    const notification2 = {
      guid: 'guid2',
    } as any;

    expect(new NotificationEqualityComparator().equals(notification1, notification2)).toBeFalse();
  });
});
