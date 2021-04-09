import { UnitsValidatorDirective } from './units-validator.directive';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BookStatus} from '../models/book-status';

describe('UnitsValidatorDirective', () => {
  let form: FormGroup = null;

  beforeEach(() => {
    form = new FormBuilder().group({
      doneUnits: new FormControl(),
      totalUnits: new FormControl(),
      status: new FormControl(),
    });
  });

  it('should create an instance', () => {
    const directive = new UnitsValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should set error for undefined total', () => {
    const directive = new UnitsValidatorDirective();

    form.setValue({
      doneUnits: 100,
      totalUnits: null,
      status: BookStatus.InProgress,
    });

    const result = directive.validate(form);
    const expected = {
      invalidUnits: true
    };

    expect(result).toEqual(expected);
  });

  it('should set error for undefined total lover then done', () => {
    const directive = new UnitsValidatorDirective();

    form.setValue({
      doneUnits: 100,
      totalUnits: 20,
      status: BookStatus.InProgress,
    });

    const result = directive.validate(form);
    const expected = {
      invalidUnits: true
    };

    expect(result).toEqual(expected);
  });

  it('should pass error for non progress book', () => {
    const directive = new UnitsValidatorDirective();

    form.setValue({
      doneUnits: 100,
      totalUnits: 20,
      status: BookStatus.ToRead,
    });

    const result = directive.validate(form);
    const expected: any = null;

    expect(result).toEqual(expected);
  });

  it('should pass values', () => {
    const directive = new UnitsValidatorDirective();

    form.setValue({
      doneUnits: 100,
      totalUnits: 200,
      status: BookStatus.InProgress,
    });

    const result = directive.validate(form);
    const expected: any = null;

    expect(result).toEqual(expected);
  });
});
