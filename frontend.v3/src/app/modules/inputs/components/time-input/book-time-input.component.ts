import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor/value-accessor';
import { TimeProgress } from '../../../book/models/time-progress';

@Component({
  selector: 'app-book-time-input',
  templateUrl: './book-time-input.component.html',
  styleUrls: ['./book-time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BookTimeInputComponent),
      multi: true,
    },
  ],
})
export class BookTimeInputComponent extends ValueAccessorBase<TimeProgress> {
  public form: FormGroup = null;

  constructor() {
    super();

    this.form = new FormBuilder().group({
      hours: new FormControl(null),
      minutes: new FormControl(null),
    });

    this.form.valueChanges.subscribe(data => {
      this.emitChangeValue(data);
    });
  }

  public writeValue(value: TimeProgress): void {
    this.form.setValue({
      hours: value?.hours,
      minutes: value?.minutes,
    });
  }

  public emitTouch(event: MouseEvent | TouchEvent): void {
    super.emitTouch(event);
  }
}
