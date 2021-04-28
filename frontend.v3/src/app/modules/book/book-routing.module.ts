import { Routes } from '@angular/router';
import { Action } from '../../main/resolvers/action.resolver';
import { AllSeriesResolver } from '../collection/resolvers/all-series.resolver';
import { BookEditViewComponent } from './components/book-edit-view/book-edit-view.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { DoneBooksListComponent } from './components/done-books-list/done-books-list.component';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { ToReadBooksListComponent } from './components/to-read-books-list/to-read-books-list.component';
import { AllBooksResolver } from './resolvers/all-books.resolver';
import { BookStatusResolver } from './resolvers/book-status.resolver';
import { BookResolver } from './resolvers/book.resolver';
import { DoneBooksResolver } from './resolvers/done-books.resolver';
import { InProgressBooksResolver } from './resolvers/in-progress-books.resolver';
import { ToReadBooksResolver } from './resolvers/to-read-books.resolver';
import { BookRereadFormComponent } from './components/book-reread-form/book-reread-form.component';
import { BookReadingsResolver } from './resolvers/book-readings.resolver';

export const routes: Routes = [
  {
    component: InProgressBooksListComponent,
    path: 'in-progress',
    pathMatch: 'full',
    resolve: {
      books: InProgressBooksResolver,
    },
    data: {
      title: 'Читаю сейчас',
    },
    runGuardsAndResolvers: 'always',
  },
  {
    component: ToReadBooksListComponent,
    path: 'to-read',
    pathMatch: 'full',
    resolve: {
      books: ToReadBooksResolver,
    },
    data: {
      title: 'Буду читать',
      searchEnabled: true,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    component: DoneBooksListComponent,
    path: 'done',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    },
    data: {
      title: 'Прочитаные',
      searchEnabled: true,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    component: BookViewComponent,
    path: 'book/:guid',
    pathMatch: 'full',
    resolve: {
      book: BookResolver,
      readings: BookReadingsResolver,
    },
    data: {
      title: 'О книге',
    },
    runGuardsAndResolvers: 'always',
  },
  {
    component: BookEditViewComponent,
    path: 'book/edit/:guid',
    pathMatch: 'full',
    resolve: {
      book: BookResolver,
      allBooks: AllBooksResolver,
      series: AllSeriesResolver,
    },
    data: {
      action: Action.Edit,
      title: 'Редактировать книгу',
    },
  },
  {
    component: BookEditViewComponent,
    path: 'book/create/:status',
    pathMatch: 'full',
    resolve: {
      status: BookStatusResolver,
      allBooks: AllBooksResolver,
      series: AllSeriesResolver,
    },
    data: {
      action: Action.Create,
      title: 'Создать книгу',
    },
  },
  {
    component: BookRereadFormComponent,
    path: 'book/reread/:guid',
    pathMatch: 'full',
    resolve: {
      book: BookResolver,
    },
    data: {
      title: 'Перечитать книгу',
    },
  },
];
