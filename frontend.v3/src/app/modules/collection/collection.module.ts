import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { BookModule } from '../book/book.module';
import { FormattingModule } from '../formatting/formatting.module';
import { CollectionDeleteDialogComponent } from './components/collection-delete-dialog/collection-delete-dialog.component';
import { CollectionEditViewComponent } from './components/collection-edit-view/collection-edit-view.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionViewComponent } from './components/collection-view/collection-view.component';
import { ListModuleModule } from '../list-module/list-module.module';

@NgModule({
  declarations: [CollectionEditViewComponent, CollectionListComponent, CollectionViewComponent, CollectionDeleteDialogComponent],
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
    MatIconModule,
    MatDialogModule,
    ListModuleModule,
  ],
})
export class CollectionModule {}
