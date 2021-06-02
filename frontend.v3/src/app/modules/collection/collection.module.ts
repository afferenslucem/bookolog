import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookModule } from '../book/book.module';
import { FormattingModule } from '../formatting/formatting.module';
import { CollectionDeleteDialogComponent } from './components/collection-delete-dialog/collection-delete-dialog.component';
import { CollectionEditViewComponent } from './components/collection-edit-view/collection-edit-view.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectionViewComponent } from './components/collection-view/collection-view.component';
import { ListModuleModule } from '../list-module/list-module.module';
import { UiButtonModule, UiDividerModule, UiFormFieldModule, UiModalModule, UiProgressBarModule } from 'ui-kit';

@NgModule({
  declarations: [CollectionEditViewComponent, CollectionListComponent, CollectionViewComponent, CollectionDeleteDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormattingModule,
    RouterModule,
    BookModule,
    ListModuleModule,
    UiFormFieldModule,
    UiButtonModule,
    UiProgressBarModule,
    UiDividerModule,
    UiModalModule,
  ],
})
export class CollectionModule {}
