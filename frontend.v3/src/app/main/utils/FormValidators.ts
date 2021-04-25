import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
  public static confirmationValidation(form: AbstractControl): ValidationErrors | null {
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
