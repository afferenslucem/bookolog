import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-avatar-change',
  templateUrl: './avatar-change.component.html',
  styleUrls: ['./avatar-change.component.scss'],
})
export class AvatarChangeComponent implements OnInit {
  public form = new FormGroup({
    image: new FormControl(null, Validators.required),
  });

  constructor(public userService: UserService, private notification: NotificationService) {}

  public ngOnInit(): void {}

  public async submit(): Promise<void> {
    try {
      await this.userService.setAvatar(this.image);
      this.notification.createInfoNotification('Аватар успешно изменен');
    } catch (e) {
      this.notification.createErrorNotification('Неизвестная ошибка');
    }
  }

  public get image(): any {
    return this.form.value.image;
  }
}
