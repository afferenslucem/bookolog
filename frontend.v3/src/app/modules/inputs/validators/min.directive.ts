import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMin]',
})
export class MinDirective implements OnInit, Validator {
  private minNumber: number = null;

  public constructor(private elRef: ElementRef<HTMLInputElement>) {}

  @Input('appMin')
  public set min(v: number | string) {
    this.minNumber = Number(v);
  }

  public ngOnInit(): void {
    this.elRef.nativeElement.min = this.minNumber.toString();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value);

    if (Number.isNaN(value)) {
      return null;
    } else if (value < this.minNumber) {
      return {
        min: this.minNumber,
        actual: value,
      };
    } else {
      return null;
    }
  }
}
