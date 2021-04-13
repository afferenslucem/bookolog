import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../models/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-area',
  templateUrl: './notification-area.component.html',
  styleUrls: ['./notification-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationAreaComponent {
  constructor(private notificationService: NotificationService) {}

  public get notifications$(): Observable<Notification[]> {
    return this.notificationService.notifications$;
  }

  public notificationTrackBy(index: number, item: Notification): any {
    return item.guid;
  }
}
