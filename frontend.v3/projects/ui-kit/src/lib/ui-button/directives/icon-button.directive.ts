import { Directive, ElementRef, OnInit } from '@angular/core';
import { ButtonDirective } from './button.directive';

@Directive({
  selector: '[uiIconButton]',
})
export class IconButtonDirective extends ButtonDirective implements OnInit {
  constructor(elRef: ElementRef<HTMLElement>) {
    super(elRef);
  }
}
