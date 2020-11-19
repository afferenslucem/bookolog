import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormattingModule } from '../formatting/formatting.module';
import { routes } from './book-routing.module';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { InProgressBookComponent } from './components/in-progress-book/in-progress-book.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { BookPagesProgressComponent } from './components/book-pages-progress/book-pages-progress.component';
import { BookTimeProgressComponent } from './components/book-time-progress/book-time-progress.component';
import { ToReadBooksListComponent } from './components/to-read-books-list/to-read-books-list.component';
import { ToReadBookComponent } from './components/to-read-book/to-read-book.component';
import { DoneBooksListComponent } from './components/done-books-list/done-books-list.component';


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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormattingModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
})
export class BookModule {
}
