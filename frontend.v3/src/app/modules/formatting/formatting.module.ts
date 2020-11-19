import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './pipes/join.pipe';
import { ChooseFormPipe } from './pipes/choose-form.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { TimifyUnitsPipe } from './pipes/timify-units.pipe';



@NgModule({
    declarations: [JoinPipe, ChooseFormPipe, PadStartPipe, TimifyUnitsPipe],
  exports: [
    JoinPipe,
    TimifyUnitsPipe,
  ],
    imports: [
        CommonModule,
    ],
})
export class FormattingModule { }
