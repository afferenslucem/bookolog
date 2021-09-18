import { TimeProgressValidatorDirective } from './time-progress-validator.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

describe('TimeProgressValidatorDirective', () => {
  let form: FormGroup = null;

  beforeEach(() => {
    form = new FormBuilder().group({
      hours: new FormControl(),
      minutes: new FormControl(),
    });
  });

  it('should create an instance', () => {
    const directive = new TimeProgressValidatorDirective();

    expect(directive).toBeTruthy();
  });

  it('should set error for wrong minutes', () => {
    const directive = new TimeProgressValidatorDirective();

    form.setValue({
      hours: '1',
      minutes: '90',
    });

    const result = directive.validate(form);
    const expected = {
      invalidMinutes: true,
    };

    expect(result).toEqual(expected);
  });
});
