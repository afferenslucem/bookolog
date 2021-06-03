import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormattingModule } from '../formatting/formatting.module';
import { BookDateInputComponent } from './components/date-input/book-date-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { TagValueComponent } from './components/tag-value/tag-value.component';
import { BookTagsInputComponent } from './components/tags-input/book-tags-input.component';
import { BookTimeInputComponent } from './components/time-input/book-time-input.component';
import { DateMonthValidatorDirective } from './validators/date-month-validator.directive';
import { DateDayValidatorDirective } from './validators/date-day-validator.directive';
import { UiButtonModule, UiFormFieldModule } from 'bookolog-ui-kit';

@NgModule({
  declarations: [
    BookDateInputComponent,
    BookTimeInputComponent,
    BookTagsInputComponent,
    TagValueComponent,
    FileInputComponent,
    DateMonthValidatorDirective,
    DateDayValidatorDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormattingModule, UiFormFieldModule, UiButtonModule],
  exports: [BookDateInputComponent, BookTimeInputComponent, BookTagsInputComponent, TagValueComponent, FileInputComponent],
})
export class InputsModule {}
