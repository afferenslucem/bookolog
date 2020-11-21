import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-book-time-input',
  templateUrl: './book-time-input.component.html',
  styleUrls: ['./book-time-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BookTimeInputComponent),
    multi: true,
  }],
})
export class BookTimeInputComponent extends ValueAccessorBase<number>  implements OnInit {
  public form: FormGroup = null;

  constructor() {
    super();

    this.form = new FormBuilder().group({
      hours: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      minutes: new FormControl(null, [Validators.min(0), Validators.max(59)]),
    });

    this.form.valueChanges.subscribe(data => {
      this.emitChangeValue((+data.hours * 60) + +data.minutes);
    });
  }

  ngOnInit(): void {
  }

  public writeValue(value: number): void {
    const hours = Math.floor(value / 60) || null;
    const minutes = value % 60;

    this.form.setValue({
      hours,
      minutes,
    });
  }

  public emitTouch(event: MouseEvent | TouchEvent): void {
    super.emitTouch(event);
  }
}
