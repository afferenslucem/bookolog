import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import {StartPageComponent} from './main/components/start-page/start-page.component';
import { routes as bookListRoutes } from './modules/book/book-routing.module';
import { BookSyncResolver } from './modules/book/resolvers/book-sync.resolver';

const routes: Routes = [
  {
    component: StartPageComponent,
    path: '',
    pathMatch: 'full'
  },
  {
    component: InnerAreaComponent,
    path: '',
    pathMatch: 'prefix',

    children: [
      ...bookListRoutes
    ],
    resolve: {
      sync: BookSyncResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }