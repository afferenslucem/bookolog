import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export type DeleteDialogResult = 'delete' | 'cancel';

@Component({
  selector: 'app-collection-delete-dialog',
  templateUrl: './collection-delete-dialog.component.html',
  styleUrls: ['./collection-delete-dialog.component.scss'],
})
export class CollectionDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CollectionDeleteDialogComponent>) {
  }

  public ngOnInit(): void {
  }

  public delete(): void {
    this.dialogRef.close('delete');
  }

  public cancel(): void {
    this.dialogRef.close('cancel');
  }
}
