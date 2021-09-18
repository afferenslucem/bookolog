import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BookStatus } from '../models/book-status';

@Directive({
  selector: '[appUnitsValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UnitsValidatorDirective, multi: true }],
})
export class UnitsValidatorDirective implements Validator {
  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors | null {
    const status = formGroup.get('status').value as BookStatus;
    if (Number(status) !== BookStatus.InProgress) {
      return null;
    }

    const doneUnits = formGroup.get('done').value as number;
    const totalUnits = formGroup.get('total').value as number;

    return doneUnits > totalUnits
      ? {
          invalidUnits: true,
        }
      : null;
  }
}
