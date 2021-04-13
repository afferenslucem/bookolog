import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';
import { NotificationService } from '../../services/notification.service';

import { NotificationItemComponent } from './notification-item.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('NotificationComponent', () => {
  let component: NotificationItemComponent;
  let fixture: ComponentFixture<NotificationItemComponent>;
  let elRef: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [NotificationItemComponent],
      providers: [NotificationService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationItemComponent);
    component = fixture.componentInstance;
    elRef = fixture.nativeElement;

    component.notification = new Notification({
      guid: 'guid',
      text: 'text',
      type: NotificationType.Error,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render check', () => {
    it('text render', () => {
      const text = elRef.querySelector('.notification__text').textContent.trim();

      expect(text).toEqual('text');
    });
  });

  describe('Button color check', () => {
    it('should return primary', () => {
      component.notification.type = NotificationType.Info;

      const color = component.matColor;

      expect(color).toEqual('primary');
    });

    it('should return accent', () => {
      component.notification.type = NotificationType.Warning;

      const color = component.matColor;

      expect(color).toEqual('accent');
    });

    it('should return warn', () => {
      component.notification.type = NotificationType.Error;

      const color = component.matColor;

      expect(color).toEqual('warn');
    });
  });

  describe('Close check', () => {
    it('should trigger close', () => {
      const service: NotificationService = TestBed.inject<NotificationService>(NotificationService);

      const closeSpy = spyOn(service, 'close');

      component.close();

      expect(closeSpy).toHaveBeenCalledOnceWith('guid');
    });
  });
});
