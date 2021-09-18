import { Directive, ElementRef, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimFraction]',
})
export class TrimFractionDirective implements OnInit, OnDestroy {
  @Input('appTrimFraction')
  public length = 0;

  private inputSubscription: Subscription;

  constructor(private elementRef: ElementRef, @Self() private ngControl: NgControl) {}

  public get value(): string {
    return this.ngControl.value?.toString();
  }

  public set value(v: string) {
    this.ngControl.control.patchValue(v);
  }

  public ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.inputSubscription = fromEvent(this.elementRef.nativeElement, 'input').subscribe(() => this.trim());
  }

  public trim(): void {
    const currentValue: string = this.value;

    if (!currentValue || !currentValue.includes('.')) {
      return;
    }

    const result = Number(currentValue).toFixed(this.length);

    if (result.includes('.')) {
      this.value = this.cutLastZeros(result);
    } else {
      this.value = result;
    }
  }

  private cutLastZeros(num: string): string {
    const withoutZeros = num.replace(/0+$/, '');

    if (withoutZeros.endsWith('.') && this.length === 0) {
      return withoutZeros.replace('.', '');
    } else {
      return withoutZeros;
    }
  }
}
