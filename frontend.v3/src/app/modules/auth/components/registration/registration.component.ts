import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getConsoleLogger } from '../../../../main/app.logging';
import { TitleService } from '../../../ui/service/title.service';
import { AuthService } from '../../services/auth.service';

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
  private logger = getConsoleLogger('RegistrationComponent');

  public error: RegistrationError = null;

  public form: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    email: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    password: new FormControl(null, [Validators.required]),
    confirmation: new FormControl(null, [Validators.required]),
  }, [this.confirmationValidation]);

  constructor(private authService: AuthService, private router: Router, private title: TitleService) {
  }

  ngOnInit(): void {
    this.title.setRegistration();
  }

  public async submit(event?: Event): Promise<void> {
    event.preventDefault();

    const data = this.form.value;
    delete data.confirmation;

    try {
      await this.authService.registration(data);
      await this.router.navigate(['/login']);
    } catch (e) {
      this.logger.debug('Error', e);

      if (e.error === 'User with same email already exisists') {
        this.error = RegistrationError.EmailExists;
      } else if (e.error === 'User with same login already exisists') {
        this.error = RegistrationError.LoginExists;
      } else {
        this.error = RegistrationError.Undefined;
      }
    }
  }

  public confirmationValidation(form: AbstractControl): ValidationErrors | null {
    if (form.get('password')?.value !== form.get('confirmation')?.value) {
      const error = {
        passwordMatch: true,
      };

      form.get('confirmation').setErrors(error);
      return error;
    } else {
      return null;
    }
  }
}
