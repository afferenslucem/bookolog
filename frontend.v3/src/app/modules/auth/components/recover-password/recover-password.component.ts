import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { AuthService } from '../../services/auth.service';
import { EmailForm } from '../../../../main/utils/email-form';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public form: EmailForm = new EmailForm(null);

  constructor(
    private authService: AuthService,
    private title: TitleService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.title.setRecoveryPassword();
  }

  public async submit(): Promise<void> {
    const value = this.form.value;

    try {
      await this.authService.recoveryPassword(value);

      this.notificationService.createInfoNotification('Письмо с паролем отправлено на почту');

      await this.router.navigate(['/login']);
    } catch (e) {
      this.notificationService.createErrorNotification('Ошибка восстановления пароля');
    }
  }
}
