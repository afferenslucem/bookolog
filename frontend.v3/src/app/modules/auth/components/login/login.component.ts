import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleService } from '../../../ui/service/title.service';
import { CredentialsException } from '../../exceptions/credentials.exception';
import { Credentials } from '../../models/credentials';
import { AuthService } from '../../services/auth.service';

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

  public form: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router, private title: TitleService) {
  }

  ngOnInit(): void {
    this.title.setLogin();
  }

  public async submit(event?: Event): Promise<void> {
    event.preventDefault();

    this.error = null;

    const data = this.formToModel();

    try {
      await this.authService.login(data);
      this.router.navigate(['/in-progress']);
    } catch (e) {
      if (e instanceof CredentialsException) {
        this.error = LoginError.Credential;
      } else {
        this.error = LoginError.Undefined;
      }
    }
  }

  private formToModel(): Credentials {
    const data = {
      login: this.form.get('login').value,
      password: this.form.get('password').value,
    };

    return data;
  }
}
