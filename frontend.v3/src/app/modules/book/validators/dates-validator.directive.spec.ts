import { DatesValidatorDirective } from './dates-validator.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BookStatus } from '../models/book-status';

describe('DatesValidatorDirective', () => {
  let form: FormGroup = null;

  beforeEach(() => {
    form = new FormBuilder().group({
      started: new FormControl(),
      finished: new FormControl(),
      status: new FormControl(),
    });
  });

  it('should create an instance', () => {
    const directive = new DatesValidatorDirective();

    expect(directive).toBeTruthy();
  });

  it('should return error for only started value', () => {
    const directive = new DatesValidatorDirective();

    form.setValue({
      started: {
        year: 2021,
        month: 4,
        day: 9,
      },
      finished: {
        year: null,
        month: null,
        day: null,
      },
      status: BookStatus.Done,
    });

    const result = directive.validate(form);
    const expected: any = null;

    expect(result).toEqual(expected);
  });

  it('should pass error for only finished value', () => {
    const directive = new DatesValidatorDirective();

    form.setValue({
      started: {
        year: null,
        month: null,
        day: null,
      },
      finished: {
        year: 2021,
        month: 4,
        day: 9,
      },
      status: BookStatus.Done,
    });

    const result = directive.validate(form);
    const expected: any = null;

    expect(result).toEqual(expected);
  });

  it('should return error for finished value lower then started', () => {
    const directive = new DatesValidatorDirective();

    form.setValue({
      started: {
        year: 2021,
        month: 4,
        day: 11,
      },
      finished: {
        year: 2021,
        month: 4,
        day: 9,
      },
      status: BookStatus.Done,
    });

    const result = directive.validate(form);

    const expected = {
      invalidDates: true,
    };

    expect(result).toEqual(expected);
  });

  it('should pass error for non done book', () => {
    const directive = new DatesValidatorDirective();

    form.setValue({
      started: {
        year: 2021,
        month: 4,
        day: 19,
      },
      finished: {
        year: 2021,
        month: 4,
        day: 9,
      },
      status: BookStatus.InProgress,
    });

    const result = directive.validate(form);
    const expected: any = null;

    expect(result).toEqual(expected);
  });
});
