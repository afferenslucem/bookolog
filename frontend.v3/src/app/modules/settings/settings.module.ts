import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './components/settings/settings.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { AvatarChangeComponent } from './components/avatar-change/avatar-change.component';
import { InputsModule } from '../inputs/inputs.module';


@NgModule({
  declarations: [SettingsComponent, PasswordChangeComponent, AvatarChangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    InputsModule,
  ],
})
export class SettingsModule {
}
