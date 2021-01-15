import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputsModule } from '../inputs/inputs.module';
import { AvatarChangeComponent } from './components/avatar-change/avatar-change.component';
import { EmailChangeComponent } from './components/email-change/email-change.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [SettingsComponent, PasswordChangeComponent, AvatarChangeComponent, EmailChangeComponent],
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
