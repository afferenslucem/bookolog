import { AbstractForm } from '../../../main/utils/abstract-form';
import { Credentials } from '../models/credentials';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginForm extends AbstractForm<Credentials> {
  public constructor() {
    const form: FormGroup = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    super(form);
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

  public get password(): string {
    return this.getPasswordControl().value;
  }

  public set password(v: string) {
    this.getPasswordControl().setValue(v);
  }

  public get passwordInvalid(): boolean {
    return this.getPasswordControl().invalid;
  }

  private getLoginControl(): AbstractControl {
    return this.form.get('login');
  }

  private getPasswordControl(): AbstractControl {
    return this.form.get('password');
  }
}
