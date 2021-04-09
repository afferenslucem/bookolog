import { DateDayValidatorDirective } from './date-day-validator.directive';
import {FormBuilder, FormControl} from '@angular/forms';

describe('DateDayValidatorDirective', () => {
  let validator: DateDayValidatorDirective = null;

  beforeEach(() => {
    validator = new DateDayValidatorDirective();
  });

  it('should create an instance', () => {
    const directive = new DateDayValidatorDirective();
    expect(directive).toBeTruthy();
  });


  describe('dayValidator', () => {
    it('should return invalidMonth', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(null),
        day: new FormControl(21),
      });

      const result = validator.validate(form);

      expect(result.invalidMonth).toBeTrue();
      expect(result.invalidYear).toBeFalsy();
    });

    it('should return invalidYear', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl('12'),
        day: new FormControl(21),
      });

      const result = validator.validate(form);

      expect(result.invalidMonth).toBeFalsy();
      expect(result.invalidYear).toBeTrue();
    });

    it('should return both', () => {
      const form = new FormBuilder().group({
        year: new FormControl(null),
        month: new FormControl(null),
        day: new FormControl(21),
      });

      const result = validator.validate(form);

      expect(result.invalidMonth).toBeTrue();
      expect(result.invalidYear).toBeTrue();
    });

    it('should return no errors', () => {
      const form = new FormBuilder().group({
        year: new FormControl(1998),
        month: new FormControl(12),
        day: new FormControl(21),
      });

      const result = validator.validate(form);

      expect(result).toEqual(null);
    });
  });
});
