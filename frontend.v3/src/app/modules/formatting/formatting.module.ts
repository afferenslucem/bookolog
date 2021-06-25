import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ChooseFormPipe } from './pipes/choose-form.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { PadStartPipe } from './pipes/pad-start.pipe';
import { TimifyUnitsPipe } from './pipes/timify-units.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { TrimOnBlurDirective } from './directives/trim-on-blur.directive';
import { TrimFractionDirective } from './directives/trim-fraction.directive';

@NgModule({
  declarations: [
    JoinPipe,
    ChooseFormPipe,
    PadStartPipe,
    TimifyUnitsPipe,
    CapitalizePipe,
    MaxLengthPipe,
    TrimOnBlurDirective,
    TrimFractionDirective,
  ],
  exports: [
    JoinPipe,
    TimifyUnitsPipe,
    CapitalizePipe,
    ChooseFormPipe,
    MaxLengthPipe,
    TrimOnBlurDirective,
    TrimFractionDirective,
  ],
  imports: [CommonModule],
})
export class FormattingModule {
}
