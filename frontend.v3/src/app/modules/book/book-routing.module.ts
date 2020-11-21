import { Routes } from '@angular/router';
import { BookEditViewComponent } from './components/book-edit-view/book-edit-view.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { DoneBooksListComponent } from './components/done-books-list/done-books-list.component';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { ToReadBooksListComponent } from './components/to-read-books-list/to-read-books-list.component';
import { AllBooksResolver } from './resolvers/all-books.resolver';
import { BookResolver } from './resolvers/book.resolver';
import { DoneBooksResolver } from './resolvers/done-books.resolver';
import { InProgressBooksResolver } from './resolvers/in-progress-books.resolver';
import { ToReadBooksResolver } from './resolvers/to-read-books.resolver';

export const routes: Routes = [
  {
    component: InProgressBooksListComponent,
    path: 'in-progress',
    pathMatch: 'full',
    resolve: {
      books: InProgressBooksResolver,
    },
  },
  {
    component: ToReadBooksListComponent,
    path: 'to-read',
    pathMatch: 'full',
    resolve: {
      books: ToReadBooksResolver,
    }
  },
  {
    component: DoneBooksListComponent,
    path: 'done',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    }
  },
  {
    component: BookViewComponent,
    path: 'book/:guid',
    pathMatch: 'full',
    resolve: {
      book: BookResolver,
    }
  },
  {
    component: BookEditViewComponent,
    path: 'book/edit/:guid',
    pathMatch: 'full',
    resolve: {
      book: BookResolver,
      allBooks: AllBooksResolver,
    }
  },
];
