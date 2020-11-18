import { Routes } from '@angular/router';
import { InProgressBooksListComponent } from './components/in-progress-books-list/in-progress-books-list.component';
import { InProgressBooksResolver } from './resolvers/in-progress-books.resolver';

export const routes: Routes = [
  {
    component: InProgressBooksListComponent,
    path: 'in-progress',
    pathMatch: 'full',
    resolve: {
      books: InProgressBooksResolver,
    }
  },
];
