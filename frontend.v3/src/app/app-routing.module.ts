import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerAreaComponent } from './main/components/inner-area/inner-area.component';
import { StartPageComponent } from './main/components/start-page/start-page.component';
import { LoggedInGuard } from './modules/auth/guards/logged-in.guard';
import { LogoutGuard } from './modules/auth/guards/logout.guard';
import { routes as bookListRoutes } from './modules/book/book-routing.module';
import { SyncResolver } from './modules/book/resolvers/sync-resolver.service';
import { routes as collectionRoutes } from './modules/collection/collection-routes';
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

    children: [
      ...bookListRoutes,
      ...statisticRoutes,
      ...settingsRoutes,
      ...collectionRoutes,
    ],
    resolve: {
      sync: SyncResolver,
      user: MeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
