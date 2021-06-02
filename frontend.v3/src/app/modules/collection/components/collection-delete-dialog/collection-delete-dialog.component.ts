import { Component, OnInit } from '@angular/core';
import { ModalRef } from 'ui-kit';

export type DeleteDialogResult = 'delete' | 'cancel';

@Component({
  selector: 'app-collection-delete-dialog',
  templateUrl: './collection-delete-dialog.component.html',
  styleUrls: ['./collection-delete-dialog.component.scss'],
})
export class CollectionDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: ModalRef<CollectionDeleteDialogComponent>) {}

  public ngOnInit(): void {}

  public delete(): void {
    this.dialogRef.close('delete');
  }

  public cancel(): void {
    this.dialogRef.close('cancel');
  }
}
