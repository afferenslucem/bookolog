import { environment } from '../../../../environments/environment';
import { NotificationType } from '../models/notification-type';
import { NotificationFactory } from './notification-factory';

describe('NotificationFactory', () => {
  it('should create an instance', () => {
    expect(new NotificationFactory()).toBeTruthy();
  });

  describe('Options check', () => {
    it('should create notifications without options', () => {
      const factory = new NotificationFactory();

      const notification = factory.createInfoNotification('text');

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.timeout).toEqual(environment.notificationCloseTime);
      expect(notification.type).toEqual(NotificationType.Info);
    });

    it('should create notifications with options', () => {
      const factory = new NotificationFactory();

      const notification = factory.createInfoNotification('text', {
        autoclose: false
      });

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.timeout).toEqual(null);
      expect(notification.type).toEqual(NotificationType.Info);
    });

    it('should create notifications with options', () => {
      const factory = new NotificationFactory();

      const notification = factory.createInfoNotification('text', {
        timeout: 1000
      });

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.timeout).toEqual(1000);
      expect(notification.type).toEqual(NotificationType.Info);
    });
  });

  describe('Create notification by type', () => {
    it('should create info notification', () => {
      const factory = new NotificationFactory();

      const notification = factory.createInfoNotification('text');

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.type).toEqual(NotificationType.Info);
    });

    it('should create error notification', () => {
      const factory = new NotificationFactory();

      const notification = factory.createErrorNotification('text');

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.type).toEqual(NotificationType.Error);
    });

    it('should create warn notification', () => {
      const factory = new NotificationFactory();

      const notification = factory.createWarningNotification('text');

      expect(notification.guid).toBeDefined();
      expect(notification.text).toEqual('text');
      expect(notification.type).toEqual(NotificationType.Warning);
    });
  });
});
