import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificationService } from '../../../notification/services/notification.service';
import { PasswordChangeForm } from '../../utils/password-change-form';

export enum ChangePasswordError {
  Undefined = -1,
  IncorrectOldPassword,
}

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
  public form = new PasswordChangeForm();

  public error: ChangePasswordError = null;
  public ChangePasswordError: typeof ChangePasswordError = ChangePasswordError;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {}

  public async submit(): Promise<void> {
    this.error = null;
    const data = this.form.value;

    try {
      await this.authService.changePassword(data.currentPassword, data.newPassword);

      this.notificationService.createInfoNotification('Пароль успешно изменен');

      await this.router.navigate(['/in-progress']);
    } catch (e) {
      if (e.error === 'Incorrect old password') {
        this.error = ChangePasswordError.IncorrectOldPassword;
      } else {
        this.error = ChangePasswordError.Undefined;
      }
    }
  }
}
