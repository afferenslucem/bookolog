import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '../ui/ui.module';
import { BookDateInputComponent } from './components/book-date-input/book-date-input.component';
import { BookTimeInputComponent } from './components/book-time-input/book-time-input.component';
import { BookTagsInputComponent } from './components/book-tags-input/book-tags-input.component';
import { TagValueComponent } from './components/tag-value/tag-value.component';



@NgModule({
  declarations: [BookDateInputComponent, BookTimeInputComponent, BookTagsInputComponent, TagValueComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UiModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    BookDateInputComponent,
    BookTimeInputComponent,
    BookTagsInputComponent,
  ],
})
export class BookInputsModule { }
