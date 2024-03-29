import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistrationForm } from '../../utils/registration-form';

enum RegistrationError {
  Undefined = -1,
  LoginExists = 0,
  EmailExists = 1,
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public error: RegistrationError = null;
  public RegistrationError: typeof RegistrationError = RegistrationError;
  public form: RegistrationForm = new RegistrationForm();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public async submit(event?: Event): Promise<void> {
    event?.preventDefault();

    const data = this.form.value;

    try {
      await this.authService.registration(data);
      await this.router.navigate(['/login']);
    } catch (e) {
      if (e.error === 'User with same email already exisists') {
        this.error = RegistrationError.EmailExists;
      } else if (e.error === 'User with same login already exisists') {
        this.error = RegistrationError.LoginExists;
      } else {
        this.error = RegistrationError.Undefined;
      }
    }
  }
}
