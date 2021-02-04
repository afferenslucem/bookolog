import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ChooseFormPipe } from './pipes/choose-form.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { TimifyUnitsPipe } from './pipes/timify-units.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';


@NgModule({
    declarations: [JoinPipe, ChooseFormPipe, PadStartPipe, TimifyUnitsPipe, CapitalizePipe, MaxLengthPipe],
    exports: [
        JoinPipe,
        TimifyUnitsPipe,
        CapitalizePipe,
        ChooseFormPipe,
        MaxLengthPipe
    ],
    imports: [
        CommonModule,
    ],
})
export class FormattingModule { }
