import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuHostComponent } from './components/side-menu-host/side-menu-host.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [SideMenuHostComponent, SideMenuComponent],
  imports: [CommonModule],
  exports: [SideMenuHostComponent, SideMenuComponent],
})
export class UiSideMenuModule {}
