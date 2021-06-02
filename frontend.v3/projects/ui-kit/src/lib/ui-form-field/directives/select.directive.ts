import { Directive, OnInit } from '@angular/core';
import { DestroyService } from '../../common/destroy.service';
import { FieldStateService } from '../services/field-state.service';
import { takeUntil } from 'rxjs/operators';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uiSelect]',
  providers: [DestroyService],
})
export class SelectDirective implements OnInit {
  constructor(private ngControl: NgControl, private fieldState: FieldStateService<string>, private destroy$: DestroyService) {}

  ngOnInit(): void {
    this.ngControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.fieldState.value = this.ngControl.value;
      this.fieldState.invalidControl = this.ngControl.invalid;
    });
  }
}
