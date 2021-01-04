import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Notification } from '../models/notification';
import { NotificationType } from '../models/notification-type';
import { NotificationQueueService } from './notification-queue.service';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let queue: NotificationQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationQueueService]
    });
    service = TestBed.inject(NotificationService);
    queue = TestBed.inject(NotificationQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Autoclose reactions', () => {
    it('should create timer', () => {
      const addSpy = spyOn(queue, 'add');

      //@ts-ignore
      const timerSpy = spyOn(service, 'createCloseTimer');

      service.createNotification('text', NotificationType.Info, {
        autoclose: true
      });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(timerSpy).toHaveBeenCalledTimes(1);
      
      // @ts-ignore
      expect(timerSpy).toHaveBeenCalledWith(jasmine.any(String), environment.notificationCloseTime);
    });

    it('should not create timer', () => {
      const addSpy = spyOn(queue, 'add');

      // @ts-ignore
      const timerSpy = spyOn(service, 'createCloseTimer');

      service.createNotification('text', NotificationType.Info, {
        autoclose: false
      });

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(timerSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('Notification creation', () => {
    it('should create info', () => {
      const addSpy = spyOn(queue, 'add');

      service.createInfoNotification('text', {
        autoclose: true
      });

      expect(addSpy).toHaveBeenCalledTimes(1);

      const matcher = new Notification({
        guid: jasmine.any(String),
        text: 'text',
        type: NotificationType.Info,
        timeout: environment.notificationCloseTime
      } as any);

      expect(addSpy).toHaveBeenCalledWith(matcher);
    });

    it('should create warn', () => {
      const addSpy = spyOn(queue, 'add');

      service.createWarningNotification('text', {
        autoclose: false
      });

      expect(addSpy).toHaveBeenCalledTimes(1);

      const matcher = new Notification({
        guid: jasmine.any(String),
        text: 'text',
        type: NotificationType.Warning,
        timeout: null
      } as any);

      expect(addSpy).toHaveBeenCalledWith(matcher);
    });

    it('should create error', () => {
      const addSpy = spyOn(queue, 'add');

      service.createErrorNotification('text', {
        timeout: 1000
      });

      expect(addSpy).toHaveBeenCalledTimes(1);

      const matcher = new Notification({
        guid: jasmine.any(String),
        text: 'text',
        type: NotificationType.Error,
        timeout: 1000
      } as any);

      expect(addSpy).toHaveBeenCalledWith(matcher);
    });
  });
});
