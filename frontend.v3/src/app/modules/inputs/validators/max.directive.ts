import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMax]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxDirective, multi: true }],
})
export class MaxDirective implements OnInit, Validator {
  private maxNumber: number = null;

  @Input('appMax')
  public set max(v: number | string) {
    this.maxNumber = Number(v);
  }

  public constructor(private elRef: ElementRef<HTMLInputElement>) {}

  public ngOnInit(): void {
    this.elRef.nativeElement.max = this.maxNumber.toString();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const value = Number(control.value);

    if (Number.isNaN(value)) {
      return null;
    } else if (value > this.maxNumber) {
      return {
        max: this.maxNumber,
        actual: value,
      };
    } else {
      return null;
    }
  }
}
