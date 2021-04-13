import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getConsoleLogger } from 'src/app/main/app.logging';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ILogger } from 'waterlog';

@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.component.html',
  styleUrls: ['./email-change.component.scss'],
})
export class EmailChangeComponent implements OnInit {
  public form: FormGroup = null;

  private logger: ILogger = getConsoleLogger('EmailChangeComponent');

  constructor(public userService: UserService, private notification: NotificationService) {}

  public get email(): string {
    return this.form.get('email').value;
  }

  public ngOnInit(): void {
    this.form = new FormBuilder().group({
      email: new FormControl(this.userService.user.email, [Validators.required]),
    });
  }

  public async submit(): Promise<void> {
    try {
      await this.userService.changeEmail(this.email);
      this.notification.createInfoNotification('Почта изменена');
    } catch (e) {
      this.logger.error('Could not change email', e);
      this.notification.createErrorNotification('Не удалось изменить почту');
    }
  }
}
