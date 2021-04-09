import { Directive } from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {BookStatus} from '../models/book-status';
import {BookDate} from '../models/book-date';

@Directive({
  selector: '[appDatesValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DatesValidatorDirective, multi: true}],
})
export class DatesValidatorDirective implements Validator {
  constructor() { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    const status = formGroup.get('status').value as BookStatus;
    if (status !== BookStatus.Done) { return null; }

    const started = formGroup.get('started').value as BookDate;
    const finished = formGroup.get('finished').value as BookDate;

    const startDate = new Date(started.year, started.month, started.day);
    const endDate = new Date(finished.year, finished.month, finished.day);

    return (startDate > endDate) ? {
      invalidDates: true
    } : null;
  }
}
