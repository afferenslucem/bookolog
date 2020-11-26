import { LoginPageComponent } from './components/login-page/login-page.component';
import { Routes } from '@angular/router';
import { LogoutGuard } from './guards/logout.guard';

export const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
  },
];
