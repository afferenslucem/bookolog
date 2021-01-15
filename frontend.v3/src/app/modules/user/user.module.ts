import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormattingModule } from '../formatting/formatting.module';
import { UserInfoComponent } from './components/user-info/user-info.component';


@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormattingModule,
  ],
  exports: [
    UserInfoComponent,
  ],
})
export class UserModule { }
