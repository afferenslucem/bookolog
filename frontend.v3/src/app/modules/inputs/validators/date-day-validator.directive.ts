import { Directive } from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {AbstractValidator} from '../../../main/validators/abstract-validator';

@Directive({
  selector: '[appDateDayValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateDayValidatorDirective, multi: true}],
})
export class DateDayValidatorDirective extends AbstractValidator implements Validator {
  public constructor() {
    super();
  }

  public validate(formGroup: FormGroup): ValidationErrors | null {
    let formErrors: ValidationErrors = null;

    if (!formGroup.get('month').value && formGroup.get('day').value) {
      const errors = this.assignErrors({ invalidMonth: true }, formGroup.get('day').errors);
      formGroup.get('day').setErrors(errors);
      formErrors = Object.assign({}, errors);
    }

    if (!formGroup.get('year').value && formGroup.get('day').value) {
      const errors = this.assignErrors({ invalidYear: true }, formGroup.get('day').errors);
      formGroup.get('day').setErrors(errors);
      formErrors = Object.assign(formErrors || {}, errors);
    }

    if (formErrors == null) {
      const errors = this.clearDayErrors(formGroup.get('day').errors);
      formGroup.get('day').setErrors(errors);
    }

    return formErrors;
  }

  public clearDayErrors(errors: ValidationErrors): ValidationErrors | null {
    return this.clearErrors(errors, {
      invalidMonth: false,
      invalidYear: false,
    });
  }
}
