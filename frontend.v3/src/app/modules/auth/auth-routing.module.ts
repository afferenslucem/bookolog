import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoutGuard } from './guards/logout.guard';

export const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
  },
  {
    component: RecoverPasswordComponent,
    path: 'recovery-password',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
  },
  {
    component: RegistrationComponent,
    path: 'registration',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
  },
];
