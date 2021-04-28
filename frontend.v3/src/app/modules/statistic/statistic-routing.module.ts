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
    },
    data: {
      title: 'Теги',
      searchEnabled: true,
    },
  },
  {
    component: GenresListComponent,
    path: 'genres',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    },
    data: {
      title: 'Жанры',
      searchEnabled: true,
    },
  },
  {
    component: AuthorsListComponent,
    path: 'authors',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    },
    data: {
      title: 'Авторы',
      searchEnabled: true,
    },
  },
  {
    component: YearsListComponent,
    path: 'years',
    pathMatch: 'full',
    resolve: {
      books: DoneBooksResolver,
    },
    data: {
      title: 'Года прочтения',
    },
  },
  {
    component: BookFilteredComponent,
    path: 'tag/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByTagResolver,
    },
    data: {
      searchEnabled: true,
    },
  },
  {
    component: BookFilteredComponent,
    path: 'genre/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByGenreResolver,
    },
    data: {
      searchEnabled: true,
    },
  },
  {
    component: BookFilteredComponent,
    path: 'author/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByAuthorResolver,
    },
    data: {
      searchEnabled: true,
    },
  },
  {
    component: YearStatisticComponent,
    path: 'year/:filter',
    pathMatch: 'full',
    resolve: {
      books: BooksByYearResolver,
    },
    data: {
      searchEnabled: true,
    },
  },
];
