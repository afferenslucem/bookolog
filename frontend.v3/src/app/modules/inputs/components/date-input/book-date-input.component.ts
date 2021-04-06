import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { BookDate } from '../../../book/models/book-date';
import { ValueAccessorBase } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-book-date-input',
  templateUrl: './book-date-input.component.html',
  styleUrls: ['./book-date-input.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BookDateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: BookDateInputComponent,
      multi: true
    }],
})
export class BookDateInputComponent extends ValueAccessorBase<BookDate> implements OnInit {
  public form: FormGroup = null;

  constructor() {
    super();

    this.form = new FormBuilder().group({
      year: new FormControl(this.value?.year, [Validators.min(1970), Validators.max(2030)]),
      month: new FormControl(this.value?.month, [Validators.min(1), Validators.max(12)]),
      day: new FormControl(this.value?.day, [Validators.min(1), Validators.max(31)]),
    }, {
      validators: [this.dayValidator, this.monthValidator],
    });

    this.form.valueChanges.subscribe(data => {
      this.emitChangeValue(data);
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.form.get('year').markAsTouched();
    this.form.get('month').markAsTouched();
    this.form.get('day').markAsTouched();
  }

  public dayValidator(formGroup: FormGroup): ValidationErrors | null {
    let formErrors: ValidationErrors = null;

    if (!formGroup.get('month').value && formGroup.get('day').value) {
      const error = {
        invalidMonth: true,
      };

      formGroup.get('day').setErrors(error);

      formErrors = Object.assign({}, error);
    }

    if (!formGroup.get('year').value && formGroup.get('day').value) {
      const error = {
        invalidYear: true,
      };

      formGroup.get('day').setErrors(error);

      formErrors = Object.assign(formErrors || {}, error);
    }

    if (formErrors == null) {
      formGroup.get('day').setErrors(null);
    }

    return formErrors;
  }

  public monthValidator(formGroup: FormGroup): ValidationErrors | null {
    if ((!formGroup.get('year').value && formGroup.get('month').value)) {
      const error = {
        invalidYear: true,
      };

      formGroup.get('month').setErrors(error);

      return error;
    } else {
      formGroup.get('month').setErrors(null);
      return null;
    }
  }

  public writeValue(value: BookDate): void {
    this.form.setValue({
      year: value.year || null,
      month: value.month || null,
      day: value.day || null,
    });
  }

  validate(): { invalid: boolean } | boolean {
    const isNotValid = this.form.invalid;

    return isNotValid && {
      invalid: true
    };
  }
}
