import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormattingModule } from '../formatting/formatting.module';
import { BookDateInputComponent } from './components/date-input/book-date-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { BookTagsInputComponent } from './components/tags-input/book-tags-input.component';
import { BookTimeInputComponent } from './components/time-input/book-time-input.component';
import { DateMonthValidatorDirective } from './validators/date-month-validator.directive';
import { DateDayValidatorDirective } from './validators/date-day-validator.directive';
import { UiButtonModule, UiFormFieldModule, UiChipsModule } from 'bookolog-ui-kit';
import { MaxDirective } from './validators/max.directive';
import { MinDirective } from './validators/min.directive';

@NgModule({
  declarations: [
    BookDateInputComponent,
    BookTimeInputComponent,
    BookTagsInputComponent,
    FileInputComponent,
    DateMonthValidatorDirective,
    DateDayValidatorDirective,
    MaxDirective,
    MinDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormattingModule, UiFormFieldModule, UiButtonModule, UiChipsModule],
  exports: [BookDateInputComponent, BookTimeInputComponent, BookTagsInputComponent, FileInputComponent, MaxDirective, MinDirective],
})
export class InputsModule {}
