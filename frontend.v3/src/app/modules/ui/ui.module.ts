import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from './components/title/title.component';
import { MenuIconComponent } from './components/menu-icon/menu-icon.component';



@NgModule({
    declarations: [TitleComponent, MenuIconComponent],
  exports: [
    TitleComponent,
    MenuIconComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class UiModule { }
