import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AbstractForm } from './abstract-form';

export class EmailForm extends AbstractForm<string> {
  public constructor(initialValue?: string) {
    const form = new FormBuilder().group({
      email: new FormControl(initialValue, [Validators.required, Validators.email]),
    });

    super(form);
  }

  public get invalid(): boolean {
    return this.getEmailControl().invalid;
  }

  public get errors(): ValidationErrors {
    return this.getEmailControl().errors;
  }

  public get errorMessage(): string {
    if (this.getEmailControl().hasError('required')) {
      return 'Это обязательное поле';
    } else if (this.getEmailControl().hasError('email')) {
      return 'Некорректный формат почты';
    } else {
      return null;
    }
  }

  public get value(): string {
    return this.getEmailControl().value;
  }

  public set value(v: string) {
    this.getEmailControl().setValue(v);
  }

  private getEmailControl(): AbstractControl {
    return this.form.get('email');
  }
}
