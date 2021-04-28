import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, MatIconModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, UiModule],
  exports: [SearchComponent],
})
export class SearchModule {}
