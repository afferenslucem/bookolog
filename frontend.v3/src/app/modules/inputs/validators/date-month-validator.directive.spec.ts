import { DateMonthValidatorDirective } from './date-month-validator.directive';
import {FormBuilder, FormControl} from '@angular/forms';

describe('DateMonthValidatorDirective', () => {
  let validator: DateMonthValidatorDirective = null;

  beforeEach(() => {
    validator = new DateMonthValidatorDirective();
  });

  it('should create an instance', () => {
    const directive = new DateMonthValidatorDirective();
    expect(directive).toBeTruthy();
  });

  describe('monthValidator', () => {
    it('should return invalidYear', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl('12'),
      });

      const result = validator.validate(form);

      expect(result.invalidYear).toBeTrue();
    });

    it('should return no errors', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(12),
      });

      const result = validator.validate(form);

      expect(result).toEqual(null);
    });
  });
});
