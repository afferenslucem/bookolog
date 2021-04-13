import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationItemComponent {
  @Input()
  public notification: Notification;

  constructor(private notificationService: NotificationService) {}

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

  public close(): void {
    this.notificationService.close(this.notification.guid);
  }
}
