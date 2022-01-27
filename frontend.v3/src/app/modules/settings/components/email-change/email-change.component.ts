import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { EmailForm } from '../../../../main/utils/email-form';

@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.component.html',
  styleUrls: ['./email-change.component.scss'],
})
export class EmailChangeComponent implements OnInit {
  public form: EmailForm = null;

  constructor(public userService: UserService, private notification: NotificationService) {}

  public get email(): string {
    return this.form.value;
  }

  public ngOnInit(): void {
    this.form = new EmailForm(this.userService.user.email);
  }

  public async submit(): Promise<void> {
    try {
      await this.userService.changeEmail(this.email);
      this.notification.createInfoNotification('Почта изменена');
    } catch (e) {
      this.notification.createErrorNotification('Не удалось изменить почту');
    }
  }
}
