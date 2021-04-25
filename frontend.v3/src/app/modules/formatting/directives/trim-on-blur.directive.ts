import { Directive, ElementRef, OnDestroy, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: 'input[appTrimOnBlur], textarea[appTrimOnBlur]',
})
export class TrimOnBlurDirective implements OnInit, OnDestroy {
  private blurSubscription: Subscription;

  constructor(private elementRef: ElementRef, @Self() private ngControl: NgControl) {}

  public get value(): string {
    return this.ngControl.value.toString();
  }

  public set value(v: string) {
    this.ngControl.control.patchValue(v);
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.blurSubscription = fromEvent(this.elementRef.nativeElement, 'blur').subscribe(() => this.trim());
  }

  public trim(): void {
    const currentValue: string = this.value;
    this.value = currentValue.trim();
  }
}