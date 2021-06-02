import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormattingModule } from '../formatting/formatting.module';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, FormattingModule],
  exports: [UserInfoComponent],
})
export class UserModule {}
