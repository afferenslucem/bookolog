import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ExpansionPanelHeaderComponent } from './components/expansion-panel-header/expansion-panel-header.component';
import { ExpansionPanelBodyComponent } from './components/expansion-panel-body/expansion-panel-body.component';

@NgModule({
  declarations: [AccordionComponent, ExpansionPanelComponent, ExpansionPanelHeaderComponent, ExpansionPanelBodyComponent],
  imports: [CommonModule],
  exports: [AccordionComponent, ExpansionPanelComponent, ExpansionPanelHeaderComponent, ExpansionPanelBodyComponent],
})
export class UiAccordionModule {}
