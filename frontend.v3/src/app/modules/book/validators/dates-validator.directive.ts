import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { BookStatus } from '../models/book-status';
import { BookDate } from '../models/book-date';
import { BookStartDateGreaterOrEqualThenFinishDateValidator } from '../utils/validation/book-start-date-greater-or-equal-then-finish-date-validator';

@Directive({
  selector: '[appDatesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DatesValidatorDirective, multi: true }],
})
export class DatesValidatorDirective implements Validator {
  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors | null {
    const status = formGroup.get('status').value as BookStatus;
    if (Number(status) !== BookStatus.Done) {
      return null;
    }

    const started = formGroup.get('started').value as BookDate;
    const finished = formGroup.get('finished').value as BookDate;

    const error = BookStartDateGreaterOrEqualThenFinishDateValidator.checkDates(started, finished);

    return error != null && finished.year
      ? {
          invalidDates: true,
        }
      : null;
  }
}
