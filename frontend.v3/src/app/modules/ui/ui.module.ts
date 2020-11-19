import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from './components/title/title.component';
import { MenuIconComponent } from './components/menu-icon/menu-icon.component';
import { PlusIconComponent } from './components/plus-icon/plus-icon.component';


@NgModule({
    declarations: [TitleComponent, MenuIconComponent, PlusIconComponent],
  exports: [
    TitleComponent,
    MenuIconComponent,
    PlusIconComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class UiModule { }
