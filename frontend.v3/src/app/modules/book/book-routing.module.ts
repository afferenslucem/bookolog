import { Routes } from '@angular/router';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { ToReadBooksListComponent } from './components/to-read-books-list/to-read-books-list.component';
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
];
