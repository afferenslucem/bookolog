import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormattingModule } from '../formatting/formatting.module';
import { UiModule } from '../ui/ui.module';
import { BookDateInputComponent } from './components/date-input/book-date-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { TagValueComponent } from './components/tag-value/tag-value.component';
import { BookTagsInputComponent } from './components/tags-input/book-tags-input.component';
import { BookTimeInputComponent } from './components/time-input/book-time-input.component';

@NgModule({
  declarations: [
    BookDateInputComponent,
    BookTimeInputComponent,
    BookTagsInputComponent,
    TagValueComponent,
    FileInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UiModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormattingModule,
  ],
  exports: [
    BookDateInputComponent,
    BookTimeInputComponent,
    BookTagsInputComponent,
    TagValueComponent,
    FileInputComponent,
  ],
})
export class InputsModule {}
