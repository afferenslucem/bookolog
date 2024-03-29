import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthorizedGuard } from './guards/authorized.guard.service';
import { LogoutGuard } from './guards/logout.guard';
import { StartPageComponent } from '../../main/components/start-page/start-page.component';

export const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    pathMatch: 'full',
    canActivate: [AuthorizedGuard],
    data: {
      title: 'Войти',
    },
  },
  {
    component: RecoverPasswordComponent,
    path: 'recovery-password',
    pathMatch: 'full',
    canActivate: [AuthorizedGuard],
    data: {
      title: 'Восстановить пароль',
    },
  },
  {
    component: RegistrationComponent,
    path: 'registration',
    pathMatch: 'full',
    canActivate: [AuthorizedGuard],
    data: {
      title: 'Зарегистрироваться',
    },
  },
  {
    path: 'logout',
    pathMatch: 'full',
    canActivate: [LogoutGuard],
    component: StartPageComponent,
  },
];
