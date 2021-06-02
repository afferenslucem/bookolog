import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { IconButtonDirective } from './directives/icon-button.directive';

@NgModule({
  declarations: [ButtonDirective, IconButtonDirective],
  imports: [CommonModule],
  exports: [ButtonDirective, IconButtonDirective],
})
export class UiButtonModule {}
