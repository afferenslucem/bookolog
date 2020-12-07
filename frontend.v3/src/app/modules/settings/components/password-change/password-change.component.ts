import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getLogger } from '../../../../main/app.logging';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificationService } from '../../../notification/services/notification.service';
import { UserService } from '../../../user/services/user.service';

export enum ChangePasswordError {
  Undefined = -1,
  IncorrectOldPassword
}

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  public logger = getLogger('PasswordChangeComponent');

  public form = new FormBuilder().group({
    currentPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    passwordConfirmation: new FormControl(null, [Validators.required]),
  }, {
    validators: [this.confirmationValidation]
  });

  public error: ChangePasswordError = null;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public confirmationValidation(form: AbstractControl): ValidationErrors | null {
    if (form.get('newPassword')?.value !== form.get('passwordConfirmation')?.value) {
      const error = {
        passwordMatch: true,
      };

      form.get('passwordConfirmation').setErrors(error);
      return error;
    } else {
      return null;
    }
  }

  public async submit(): Promise<void> {
    this.error = null;
    const data = this.form.value;

    try {
      await this.authService.passwordChange(data.currentPassword, data.newPassword);

      this.notificationService.createInfoNotification('Пароль успешно изменен');

      await this.router.navigate(['/in-progress']);
    } catch (e) {
      this.logger.debug('Error', e);

      if (e.error === 'Incorrect old password') {
        this.error = ChangePasswordError.IncorrectOldPassword;
      } else {
        this.error = ChangePasswordError.Undefined;
      }
    }
  }
}
