import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './pipes/join.pipe';
import { ChooseFormPipe } from './pipes/choose-form.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { TimifyUnitsPipe } from './pipes/timify-units.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
    declarations: [JoinPipe, ChooseFormPipe, PadStartPipe, TimifyUnitsPipe, CapitalizePipe],
  exports: [
    JoinPipe,
    TimifyUnitsPipe,
    CapitalizePipe,
  ],
    imports: [
        CommonModule,
    ],
})
export class FormattingModule { }
