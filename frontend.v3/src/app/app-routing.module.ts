import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import { LoggerWindowComponent } from './main/components/logger-window/logger-window.component';
import { StartPageComponent } from './main/components/start-page/start-page.component';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { LogoutGuard } from './modules/auth/guards/logout.guard';
import { routes as bookListRoutes } from './modules/book/book-routing.module';
import { BookSyncResolver } from './modules/book/resolvers/book-sync.resolver';
import { routes as collectionRoutes } from './modules/collection/collection-routes.model';
import { routes as settingsRoutes } from './modules/settings/settings-routing.module';
import { routes as statisticRoutes } from './modules/statistic/statistic-routing.module';
import { MeResolver } from './modules/user/resolvers/me.resolver';

const routes: Routes = [
  {
    component: StartPageComponent,
    path: '',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
  },
  {
    component: InnerAreaComponent,
    path: '',
    pathMatch: 'prefix',

    canActivateChild: [LoggedInGuard],

    children: [...bookListRoutes, ...statisticRoutes, ...settingsRoutes, ...collectionRoutes],
    resolve: {
      sync: BookSyncResolver,
      user: MeResolver,
    },
  },
  {
    component: LoggerWindowComponent,
    path: 'logs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
