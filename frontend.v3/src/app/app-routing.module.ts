import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import {StartPageComponent} from './main/components/start-page/start-page.component';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { routes as bookListRoutes } from './modules/book/book-routing.module';
import { routes as statisticRoutes } from './modules/statistic/statistic-routing.module';
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

    canActivateChild: [LoggedInGuard],

    children: [
      ...bookListRoutes,
      ...statisticRoutes,
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
