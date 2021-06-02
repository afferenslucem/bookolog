import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'input[uiList]',
})
export class ListDirective {
  constructor(public elRef: ElementRef<HTMLInputElement>) {}

  @Input('uiList')
  public set list(v: string) {
    this.elRef.nativeElement.setAttribute('list', v);
  }
}
