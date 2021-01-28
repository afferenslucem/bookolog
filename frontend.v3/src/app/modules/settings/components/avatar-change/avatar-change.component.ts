import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import {CroppedEvent} from 'ngx-photo-editor';

@Component({
  selector: 'app-avatar-change',
  templateUrl: './avatar-change.component.html',
  styleUrls: ['./avatar-change.component.scss'],
})
export class AvatarChangeComponent implements OnInit {
  public fileEvent: Event;

  public form = new FormGroup({
    image: new FormControl(null, Validators.required),
  });

  public base64: string;
  public image: File;

  constructor(public userService: UserService, private notification: NotificationService) {}

  public ngOnInit(): void {}
  
  public imageSelected(event: Event): void {
    this.fileEvent = event;
  }
  
  public imageCropped(event: CroppedEvent): void {
    this.base64 = event.base64;
    this.image = event.file;
  }

  public async submit(): Promise<void> {
    try {
      await this.userService.setAvatar(this.image);
      this.notification.createInfoNotification('Аватар успешно изменен');
    } catch (e) {
      this.notification.createErrorNotification('Неизвестная ошибка');
    }
  }

  public get cropHeight(): number {
    return window.innerHeight * 0.75;
  }
}
