import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { BookDate } from '../../../book/models/book-date';
import { ValueAccessorBase } from '../value-accessor/value-accessor';
import {DateUtils} from '../../../../main/utils/date-utils';

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
  public dateControl: FormControl = null;

  constructor() {
    super();

    this.form = new FormBuilder().group({
      year: new FormControl(null, [Validators.min(1970), Validators.max(this.maxYear)]),
      month: new FormControl(null, [Validators.min(1), Validators.max(12)]),
      day: new FormControl(null, [Validators.min(1), Validators.max(31)]),
    });

    this.dateControl = new FormControl(null);

    this.writeValue(this.value);

    this.form.valueChanges.subscribe((date: BookDate) => this.onBookDateChange(date));

    this.dateControl.valueChanges.subscribe((value: Date) => this.onCalendarDateChange(value));
  }

  public openPicker(picker: any): void {
    if (this.isEmptyDate(this.value)) {
      this.writeValue(DateUtils.today);
    }
    picker.open();
  }

  public onBookDateChange(date: BookDate): void {
    this.writeCalendarDate(date);
    this.emitChangeValue(date);

    this.value = date;
  }

  public onCalendarDateChange(value: Date): void {
    const date: BookDate = {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
    };

    this.writeBookDate(date);
    this.emitChangeValue(date);
  }

  ngOnInit(): void {
    this.form.get('year').markAsTouched();
    this.form.get('month').markAsTouched();
    this.form.get('day').markAsTouched();
  }

  public writeValue(value: BookDate): void {
    this.writeBookDate(value);
    this.writeCalendarDate(value);
  }

  public writeBookDate(bookDate: BookDate): void {
    this.form.setValue({
      year: bookDate?.year || null,
      month: bookDate?.month || null,
      day: bookDate?.day || null
    }, { emitEvent: false });

    this.value = bookDate;
  }

  public writeCalendarDate(bookDate: BookDate): void {
    this.dateControl.setValue(new Date(bookDate?.year, bookDate?.month ? bookDate.month - 1 : null, bookDate?.day), { emitEvent: false });
  }

  validate(): { invalid: boolean } | boolean {
    const isNotValid = this.form.invalid;

    return isNotValid && {
      invalid: true
    };
  }

  public isEmptyDate(date: BookDate): boolean {
    return !date || !date.year && !date.month && !date.day;
  }

  public get day(): number {
    return this.form.get('day').value;
  }
  public set day(v: number) {
    this.form.get('day').setValue(v);
  }

  public get month(): number {
    return this.form.get('month').value;
  }
  public set month(v: number) {
    this.form.get('month').setValue(v);
  }

  public get year(): number {
    return this.form.get('year').value;
  }
  public set year(v: number) {
    this.form.get('year').setValue(v);
  }

  public get maxYear(): number {
    return new Date().getFullYear() + 10;
  }
}
