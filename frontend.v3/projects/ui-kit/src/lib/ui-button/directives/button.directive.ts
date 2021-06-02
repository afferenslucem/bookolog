import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[uiButton]',
})
export class ButtonDirective implements OnInit {
  @Input()
  public color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | string = 'primary';

  constructor(private elRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    this.elRef.nativeElement.classList.add('btn', `btn-${this.color}`);
  }
}
