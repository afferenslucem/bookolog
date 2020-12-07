import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotificationAreaComponent } from './components/notification-area/notification-area.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';



@NgModule({
  declarations: [
    NotificationAreaComponent,
    NotificationItemComponent,
  ],
  exports: [
    NotificationAreaComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class NotificationModule { }
