import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './pipes/join.pipe';
import { ChooseFormPipe } from './pipes/choose-form.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';



@NgModule({
    declarations: [JoinPipe, ChooseFormPipe, PadStartPipe],
    exports: [
        JoinPipe,
    ],
    imports: [
        CommonModule,
    ],
})
export class FormattingModule { }
