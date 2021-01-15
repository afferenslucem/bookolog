import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { BookModule } from '../book/book.module';
import { FormattingModule } from '../formatting/formatting.module';
import { CollectionEditViewComponent } from './components/collection-edit-view/collection-edit-view.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionViewComponent } from './components/collection-view/collection-view.component';


@NgModule({
  declarations: [CollectionEditViewComponent, CollectionListComponent, CollectionViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    FormattingModule,
    RouterModule,
    BookModule,
  ],
})
export class CollectionModule { }
