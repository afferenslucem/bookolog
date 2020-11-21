import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookDateInputComponent } from './components/book-date-input/book-date-input.component';
import { BookTimeInputComponent } from './components/book-time-input/book-time-input.component';



@NgModule({
  declarations: [BookDateInputComponent, BookTimeInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
    exports: [
        BookDateInputComponent,
        BookTimeInputComponent,
    ],
})
export class BookInputsModule { }
