import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordChangeData } from '../models/password-change-data';
import { AbstractForm } from '../../../main/utils/abstract-form';
import { FormValidators } from '../../../main/utils/FormValidators';

export class PasswordChangeForm extends AbstractForm<PasswordChangeData> {
  public getCurrentPasswordControl(): AbstractControl {
    return this.form.get('currentPassword');
  }

  public get currentPassword(): string {
    return this.getCurrentPasswordControl().value;
  }

  public set currentPassword(v: string) {
    this.getCurrentPasswordControl().setValue(v);
  }

  public get currentPasswordInvalid(): boolean {
    return this.getCurrentPasswordControl().invalid;
  }

  public get currentPasswordErrorMessage(): string {
    if (this.getCurrentPasswordControl().hasError('required')) {
      return 'Это обязательное поле';
    } else {
      return null;
    }
  }

  public getNewPasswordControl(): AbstractControl {
    return this.form.get('password');
  }

  public get newPassword(): string {
    return this.getNewPasswordControl().value;
  }

  public set newPassword(v: string) {
    this.getNewPasswordControl().setValue(v);
  }

  public get newPasswordInvalid(): boolean {
    return this.getNewPasswordControl().invalid;
  }

  public get newPasswordErrorMessage(): string {
    if (this.getNewPasswordControl().hasError('required')) {
      return 'Это обязательное поле';
    } else {
      return null;
    }
  }

  public getConfirmationControl(): AbstractControl {
    return this.form.get('confirmation');
  }

  public get passwordConfirmation(): string {
    return this.getConfirmationControl().value;
  }

  public set passwordConfirmation(v: string) {
    this.getConfirmationControl().setValue(v);
  }

  public get passwordConfirmationInvalid(): boolean {
    return this.getConfirmationControl().invalid;
  }

  public get passwordConfirmationErrorMessage(): string {
    if (this.getConfirmationControl().hasError('required')) {
      return 'Это обязательное поле';
    } else if (this.getConfirmationControl().hasError('passwordMatch')) {
      return 'Пароли не совпадают';
    } else {
      return null;
    }
  }

  public constructor() {
    const form = new FormBuilder().group(
      {
        currentPassword: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmation: new FormControl(null, [Validators.required]),
      },
      {
        validators: [FormValidators.confirmationValidation],
      },
    );

    super(form);
  }

  public get value(): PasswordChangeData {
    return {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };
  }
}
