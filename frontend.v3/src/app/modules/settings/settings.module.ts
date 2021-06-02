import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';
import { AvatarChangeComponent } from './components/avatar-change/avatar-change.component';
import { EmailChangeComponent } from './components/email-change/email-change.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { FormattingModule } from '../formatting/formatting.module';
import { UiButtonModule, UiFormFieldModule } from 'ui-kit';

@NgModule({
  declarations: [SettingsComponent, PasswordChangeComponent, AvatarChangeComponent, EmailChangeComponent],
  imports: [CommonModule, ReactiveFormsModule, InputsModule, NgxPhotoEditorModule, FormattingModule, UiFormFieldModule, UiButtonModule],
})
export class SettingsModule {}
