import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationAreaComponent } from './components/notification-area/notification-area.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { UiButtonModule } from 'ui-kit';

@NgModule({
  declarations: [NotificationAreaComponent, NotificationItemComponent],
  exports: [NotificationAreaComponent],
  imports: [CommonModule, UiButtonModule],
})
export class NotificationModule {}
