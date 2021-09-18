import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appTimeProgressValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TimeProgressValidatorDirective, multi: true }],
})
export class TimeProgressValidatorDirective {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const { minutes } = control.value;

    return Number(minutes) > 59
      ? {
          invalidMinutes: true,
        }
      : null;
  }
}
