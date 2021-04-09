import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {AbstractValidator} from '../../../main/validators/abstract-validator';

@Directive({
  selector: '[appDateMonthValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateMonthValidatorDirective, multi: true}],
})
export class DateMonthValidatorDirective extends AbstractValidator implements Validator {
  public constructor() {
    super();
  }

  public validate(formGroup: FormGroup): ValidationErrors | null {
    if ((!formGroup.get('year').value && formGroup.get('month').value)) {
      const errors = this.assignErrors({ invalidYear: true }, formGroup.get('month').errors);
      formGroup.get('month').setErrors(errors);

      return errors;
    } else {
      const errors = this.clearMonthErrors(formGroup.get('month').errors);
      formGroup.get('month').setErrors(errors);

      return null;
    }
  }

  public clearMonthErrors(errors: ValidationErrors): ValidationErrors | null {
    return this.clearErrors(errors, {
      invalidYear: false
    });
  }
}
