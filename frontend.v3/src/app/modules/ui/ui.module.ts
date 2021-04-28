import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CloseIconComponent } from './components/close-icon/close-icon.component';
import { EditIconComponent } from './components/edit-icon/edit-icon.component';
import { MenuIconComponent } from './components/menu-icon/menu-icon.component';
import { PlusIconComponent } from './components/plus-icon/plus-icon.component';
import { FormattingModule } from '../formatting/formatting.module';

@NgModule({
  declarations: [MenuIconComponent, PlusIconComponent, EditIconComponent, CloseIconComponent],
  exports: [MenuIconComponent, PlusIconComponent, EditIconComponent, CloseIconComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, FormattingModule],
})
export class UiModule {}
