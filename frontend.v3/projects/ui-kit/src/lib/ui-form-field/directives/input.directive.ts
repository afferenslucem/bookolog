import { Directive, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FieldStateService } from '../services/field-state.service';
import { DestroyService } from '../../common/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[uiInput]',
  providers: [DestroyService],
})
export class InputDirective implements OnInit {
  constructor(private ngControl: NgControl, private fieldState: FieldStateService<string>, private destroy$: DestroyService) {}

  public get valid(): boolean {
    return this.ngControl.valid;
  }

  public get invalid(): boolean {
    return this.ngControl.invalid;
  }

  ngOnInit(): void {
    this.ngControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.fieldState.value = this.ngControl.value;
      this.fieldState.invalidControl = this.ngControl.invalid;
    });
  }
}
