import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
    pathMatch: 'full',
  },
];
