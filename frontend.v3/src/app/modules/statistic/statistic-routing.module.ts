import { Routes } from '@angular/router';
import { BooksByAuthorResolver } from '../book/resolvers/books-by-author.resolver';
import { BooksByGenreResolver } from '../book/resolvers/books-by-genre.resolver';
import { BooksByTagResolver } from '../book/resolvers/books-by-tag.resolver';
import { BooksByYearResolver } from '../book/resolvers/books-by-year.resolver';
import { DoneBooksResolver } from '../book/resolvers/done-books.resolver';
import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { BookFilteredComponent } from './component/book-filtered/book-filtered.component';
import { GenresListComponent } from './component/genres-list/genres-list.component';
import { TagsListComponent } from './component/tags-list/tags-list.component';
import { YearStatisticComponent } from './component/year-statistic/year-statistic.component';
import { YearsListComponent } from './component/years-list/years-list.component';

export const routes: Routes = [
  {
    component: TagsListComponent,
    path: 'tags',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    }
  },
  {
    component: GenresListComponent,
    path: 'genres',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    }
  },
  {
    component: AuthorsListComponent,
    path: 'authors',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    }
  },
  {
    component: YearsListComponent,
    path: 'years',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    }
  },
  {
    component: BookFilteredComponent,
    path: 'tag/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByTagResolver,
    }
  },
  {
    component: BookFilteredComponent,
    path: 'genre/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByGenreResolver,
    }
  },
  {
    component: BookFilteredComponent,
    path: 'author/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByAuthorResolver,
    }
  },
  {
    component: YearStatisticComponent,
    path: 'year/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByYearResolver,
    }
  },
];
