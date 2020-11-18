import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormattingModule } from '../formatting/formatting.module';
import { routes } from './book-routing.module';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { ProgressingBookComponent } from './components/progressing-book/progressing-book.component';


@NgModule({
  declarations: [InProgressBooksListComponent, ProgressingBookComponent],
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
