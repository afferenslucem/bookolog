import { Routes } from '@angular/router';
import { InProgressBooksComponent } from './components/in-progress-books/in-progress-books.component';
import { InProgressBooksResolver } from './resolvers/in-progress-books.resolver';

export const routes: Routes = [
  {
    component: InProgressBooksComponent,
    path: 'in-progress',
    pathMatch: 'full',
    resolve: {
      books: InProgressBooksResolver,
    }
  },
];
