import { Routes } from '@angular/router';
import { Action } from '../../main/resolvers/action.resolver';
import { AllBooksResolver } from '../book/resolvers/all-books.resolver';
import { BooksBySeriesResolver } from '../book/resolvers/books-by-series.resolver';
import { CollectionEditViewComponent } from './components/collection-edit-view/collection-edit-view.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionViewComponent } from './components/collection-view/collection-view.component';
import { AllSeriesResolver } from './resolvers/all-series.resolver';
import { CollectionResolver } from './resolvers/collection.resolver';

export const routes: Routes = [
  {
    component: CollectionEditViewComponent,
    path: 'series/create',
    pathMatch: 'full',
    data: {
      action: Action.Create
    },
  },
  {
    component: CollectionViewComponent,
    path: 'series/:guid',
    pathMatch: 'full',
    resolve: {
      books: BooksBySeriesResolver,
      collection: CollectionResolver,
    }
  },
  {
    component: CollectionEditViewComponent,
    path: 'series/edit/:guid',
    pathMatch: 'full',
    data: {
      action: Action.Edit,
    },
    resolve: {
      collection: CollectionResolver,
    }
  },
  {
    component: CollectionListComponent,
    path: 'series',
    pathMatch: 'full',
    resolve: {
      collections: AllSeriesResolver,
      books: AllBooksResolver,
    }
  },
];
