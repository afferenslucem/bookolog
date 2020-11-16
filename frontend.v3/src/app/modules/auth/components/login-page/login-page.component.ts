import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public async submit(event: Event) {
    event.preventDefault();

    const data = this.formToModel();

    await this.authService.login(data);
  }

  private formToModel(): Credentials {
    const data = {
      login: this.form.get('login').value,
      password: this.form.get('password').value,
    };

    return data;
  }
}
