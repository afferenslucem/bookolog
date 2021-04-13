import { Notification } from './notification';
import { NotificationType } from './notification-type';

describe('Notification', () => {
  it('should create an instance', () => {
    expect(
      new Notification({
        guid: 'guid',
        text: 'text',
      }),
    ).toBeTruthy();
  });

  it('should correct fill common data', () => {
    const notification = new Notification({
      guid: 'guid',
      text: 'text',
    });

    expect(notification.guid).toEqual('guid');
    expect(notification.text).toEqual('text');
  });

  it('should correct fill empty field', () => {
    const notification = new Notification({
      guid: 'guid',
      text: 'text',
    });

    expect(notification.type).toEqual(NotificationType.Info);
    expect(notification.autoclose).toEqual(false);
    expect(notification.timeout).toEqual(undefined);
  });

  it('should correct fill specified field', () => {
    const notification = new Notification({
      guid: 'guid',
      text: 'text',
      timeout: 1000,
      type: NotificationType.Warning,
    });

    expect(notification.type).toEqual(NotificationType.Warning);
    expect(notification.autoclose).toEqual(true);
    expect(notification.timeout).toEqual(1000);
  });
});
