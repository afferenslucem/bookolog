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
    if (status !== BookStatus.InProgress) {
      return null;
    }

    const doneUnits = formGroup.get('doneUnits').value as number;
    const totalUnits = formGroup.get('totalUnits').value as number;

    return doneUnits > totalUnits
      ? {
          invalidUnits: true,
        }
      : null;
  }
}
