import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from './directives/input.directive';
import { LabelComponent } from './components/label/label.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ErrorComponent } from './components/error/error.component';
import { ObserversModule } from '@angular/cdk/observers';
import { SelectDirective } from './directives/select.directive';
import { ListDirective } from './directives/list.directive';

@NgModule({
  declarations: [InputDirective, LabelComponent, FormFieldComponent, ErrorComponent, SelectDirective, ListDirective],
  imports: [CommonModule, ObserversModule],
  exports: [InputDirective, LabelComponent, FormFieldComponent, ErrorComponent, SelectDirective, ListDirective],
})
export class UiFormFieldModule {}
