import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent implements OnInit {
  @Input()
  public notification: Notification;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.notificationService.close(this.notification.guid);
  }

  public get matColor(): string {
    switch (this.notification.type) {
      case NotificationType.Error:
        return 'warn';

      case NotificationType.Warning:
        return 'accent';

      default:
        return 'primary';
    }
  }
}
