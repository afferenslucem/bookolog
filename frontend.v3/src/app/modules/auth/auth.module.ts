import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormattingModule } from '../formatting/formatting.module';
import { TitleModule } from '../title/title.module';
import { UiButtonModule, UiFormFieldModule, UiToolbarModule } from 'bookolog-ui-kit';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, RecoverPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormattingModule,
    TitleModule,
    UiFormFieldModule,
    UiButtonModule,
    UiToolbarModule,
  ],
})
export class AuthModule {}
