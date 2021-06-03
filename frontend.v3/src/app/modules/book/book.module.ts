import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormattingModule } from '../formatting/formatting.module';
import { InputsModule } from '../inputs/inputs.module';
import { routes } from './book-routing.module';
import { BookDeleteDialogComponent } from './components/book-delete-dialog/book-delete-dialog.component';
import { BookEditViewComponent } from './components/book-edit-view/book-edit-view.component';
import { BookHeaderComponent } from './components/book-header/book-header.component';
import { BookPagesProgressComponent } from './components/book-pages-progress/book-pages-progress.component';
import { BookTimeProgressComponent } from './components/book-time-progress/book-time-progress.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { BooksByYearsComponent } from './components/books-by-year/books-by-years.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { DoneBookComponent } from './components/done-book/done-book.component';
import { DoneBooksListComponent } from './components/done-books-list/done-books-list.component';
import { InProgressBookComponent } from './components/in-progress-book/in-progress-book.component';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { ToReadBookComponent } from './components/to-read-book/to-read-book.component';
import { ToReadBooksListComponent } from './components/to-read-books-list/to-read-books-list.component';
import { BookAuthorsComponent } from './components/book-authors/book-authors.component';
import { BookRereadFormComponent } from './components/book-reread-form/book-reread-form.component';
import { UnitsValidatorDirective } from './validators/units-validator.directive';
import { DatesValidatorDirective } from './validators/dates-validator.directive';
import { ListModuleModule } from '../list-module/list-module.module';
import { UiAccordionModule, UiButtonModule, UiDividerModule, UiFormFieldModule, UiModalModule, UiProgressBarModule } from 'bookolog-ui-kit';

@NgModule({
  declarations: [
    InProgressBooksListComponent,
    InProgressBookComponent,
    DateRangeComponent,
    BookPagesProgressComponent,
    BookTimeProgressComponent,
    ToReadBooksListComponent,
    ToReadBookComponent,
    DoneBooksListComponent,
    DoneBookComponent,
    BookViewComponent,
    BookHeaderComponent,
    BookDeleteDialogComponent,
    BookEditViewComponent,
    BooksByYearsComponent,
    BookAuthorsComponent,
    BookRereadFormComponent,
    UnitsValidatorDirective,
    DatesValidatorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormattingModule,
    ReactiveFormsModule,
    InputsModule,
    ScrollingModule,
    ListModuleModule,
    UiFormFieldModule,
    UiButtonModule,
    UiProgressBarModule,
    UiDividerModule,
    UiAccordionModule,
    UiModalModule,
  ],
  exports: [DoneBooksListComponent, DoneBookComponent, BooksByYearsComponent, ToReadBookComponent],
})
export class BookModule {}
