import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormattingModule } from '../formatting/formatting.module';
import { InputsModule } from '../inputs/inputs.module';
import { UiModule } from '../ui/ui.module';
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
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormattingModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDividerModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        UiModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatOptionModule,
        InputsModule,
    ],
    exports: [
        DoneBooksListComponent,
        BooksByYearsComponent,
        ToReadBookComponent,
    ],
})
export class BookModule {
}
