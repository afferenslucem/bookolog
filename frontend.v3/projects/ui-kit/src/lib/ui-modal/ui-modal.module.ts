import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';
import { ModalBodyComponent } from './components/modal-body/modal-body.component';
import { ModalBottomComponent } from './components/modal-bottom/modal-bottom.component';

@NgModule({
  declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalBottomComponent],
  imports: [CommonModule],
  exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalBottomComponent],
})
export class UiModalModule {}
