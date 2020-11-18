import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './pipes/join.pipe';



@NgModule({
    declarations: [JoinPipe],
    exports: [
        JoinPipe,
    ],
    imports: [
        CommonModule,
    ],
})
export class FormattingModule { }
