import { LoginPageComponent } from './components/login-page/login-page.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login',
    pathMatch: 'full'
  }
];
