import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { FormattingModule } from '../formatting/formatting.module';

@NgModule({
  declarations: [TitleComponent],
  imports: [CommonModule, FormattingModule],
  exports: [TitleComponent],
})
export class TitleModule {}
