import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { routes } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';



@NgModule({
  declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        UiModule,
    ],
})
export class AuthModule { }
