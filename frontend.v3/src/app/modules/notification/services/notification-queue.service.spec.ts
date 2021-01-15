import { TestBed } from '@angular/core/testing';
import _ from 'declarray';
import { Notification } from '../models/notification';
import { NotificationEqualityComparer } from '../models/notification-equality-comparer';
import { NotificationQueueService } from './notification-queue.service';

describe('NotificationQueueService', () => {
  let service: NotificationQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add notifications', () => {
    const notification1 = new Notification({
      guid: 'guid1',
      text: 'text1'
    });

    const notification2 = new Notification({
      guid: 'guid2',
      text: 'text2'
    });

    service.add(notification1);
    service.add(notification2);

    expect(_(service.notifications).sequenceEqual([notification1, notification2], new NotificationEqualityComparer())).toBeTrue();
  });

  it('should remove notifications', () => {
    const notification1 = new Notification({
      guid: 'guid1',
      text: 'text1'
    });

    const notification2 = new Notification({
      guid: 'guid2',
      text: 'text2'
    });

    service.add(notification1);
    service.add(notification2);

    service.remove('guid1');

    expect(_(service.notifications).sequenceEqual([notification2], new NotificationEqualityComparer())).toBeTrue();
  });
});
