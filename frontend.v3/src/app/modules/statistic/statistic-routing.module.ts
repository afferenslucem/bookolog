import { Routes } from '@angular/router';
import { AllBooksResolver } from '../book/resolvers/all-books.resolver';
import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { GenresListComponent } from './component/genres-list/genres-list.component';
import { TagsListComponent } from './component/tags-list/tags-list.component';

export const routes: Routes = [
  {
    component: TagsListComponent,
    path: 'tags',
    pathMatch: 'full',
    resolve: {
      books: AllBooksResolver,
    }
  },
  {
    component: GenresListComponent,
    path: 'genres',
    pathMatch: 'full',
    resolve: {
      books: AllBooksResolver,
    }
  },
  {
    component: AuthorsListComponent,
    path: 'authors',
    pathMatch: 'full',
    resolve: {
      books: AllBooksResolver,
    }
  },
];
