import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../../ui/service/title.service';
import { CredentialsException } from '../../exceptions/credentials.exception';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../utils/login-form';

enum LoginError {
  Undefined = -1,
  Credential = 0,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public error: LoginError = null;
  public LoginError: typeof LoginError = LoginError;

  public form: LoginForm = new LoginForm();

  constructor(private authService: AuthService, private router: Router, private title: TitleService) {}

  ngOnInit(): void {
    this.title.setLogin();
  }

  public async submit(event?: Event): Promise<void> {
    event.preventDefault();

    this.error = null;

    const data = this.form.value;

    try {
      await this.authService.login(data);
      await this.router.navigate(['/in-progress']);
    } catch (e) {
      if (e instanceof CredentialsException) {
        this.error = LoginError.Credential;
      } else {
        this.error = LoginError.Undefined;
      }
    }
  }
}
