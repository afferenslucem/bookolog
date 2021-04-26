import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyListPlaceholderComponent } from './components/empty-list-placeholder/empty-list-placeholder.component';
import { EmptyListIconComponent } from './components/empty-list-icon/empty-list-icon.component';

@NgModule({
  declarations: [EmptyListPlaceholderComponent, EmptyListIconComponent],
  imports: [CommonModule],
  exports: [EmptyListPlaceholderComponent],
})
export class ListModuleModule {}
