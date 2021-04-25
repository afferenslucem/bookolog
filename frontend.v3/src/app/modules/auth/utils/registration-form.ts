import { AbstractForm } from '../../../main/utils/abstract-form';
import { RegistrationData } from '../models/registration-data';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../../main/utils/FormValidators';

export class RegistrationForm extends AbstractForm<RegistrationData> {
  public constructor() {
    const form = new FormGroup(
      {
        login: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        confirmation: new FormControl(null, [Validators.required]),
      },
      [FormValidators.confirmationValidation],
    );

    super(form);
  }

  public getLoginControl(): AbstractControl {
    return this.form.get('login');
  }

  public get login(): string {
    return this.getLoginControl().value;
  }

  public set login(v: string) {
    this.getLoginControl().setValue(v);
  }

  public get loginInvalid(): boolean {
    return this.getLoginControl().invalid;
  }

  public get loginErrorMessage(): string {
    if (this.getLoginControl().hasError('required')) {
      return 'Это обязательное поле';
    } else {
      return null;
    }
  }

  public getEmailControl(): AbstractControl {
    return this.form.get('email');
  }

  public get email(): string {
    return this.getEmailControl().value;
  }

  public set email(v: string) {
    this.getEmailControl().setValue(v);
  }

  public get emailInvalid(): boolean {
    return this.getEmailControl().invalid;
  }

  public get emailErrorMessage(): string {
    if (this.getEmailControl().hasError('required')) {
      return 'Это обязательное поле';
    } else if (this.getEmailControl().hasError('email')) {
      return 'Некорректный формат почты';
    } else {
      return null;
    }
  }

  public getPasswordControl(): AbstractControl {
    return this.form.get('password');
  }

  public get password(): string {
    return this.getPasswordControl().value;
  }

  public set password(v: string) {
    this.getPasswordControl().setValue(v);
  }

  public get passwordInvalid(): boolean {
    return this.getPasswordControl().invalid;
  }

  public get passwordErrorMessage(): string {
    if (this.getPasswordControl().hasError('required')) {
      return 'Это обязательное поле';
    } else {
      return null;
    }
  }

  public getConfirmationControl(): AbstractControl {
    return this.form.get('confirmation');
  }

  public get confirmation(): string {
    return this.getConfirmationControl().value;
  }

  public set confirmation(v: string) {
    this.getConfirmationControl().setValue(v);
  }

  public get confirmationInvalid(): boolean {
    return this.getConfirmationControl().invalid;
  }

  public get confirmationErrorMessage(): string {
    if (this.getConfirmationControl().hasError('required')) {
      return 'Это обязательное поле';
    } else if (this.getConfirmationControl().hasError('passwordMatch')) {
      return 'Пароли не совпадают';
    } else {
      return null;
    }
  }

  public get value(): RegistrationData {
    return {
      login: this.login,
      email: this.email,
      password: this.password,
    }
  }
}
