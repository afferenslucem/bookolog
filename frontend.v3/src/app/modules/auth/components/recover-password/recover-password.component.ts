import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../notification/services/notification.service';
import { TitleService } from '../../../ui/service/title.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.email]),
  });

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
      await this.authService.recoveryPassword(value.email);

      this.notificationService.createInfoNotification('Письмо с паролем отправлено на почту');

      await this.router.navigate(['/login']);
    } catch (e) {
      this.notificationService.createErrorNotification('Ошибка восстановления пароля');
    }
  }
}
