import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export type DeleteDialogResult = 'delete' | 'cancel';

@Component({
  selector: 'app-book-delete-dialog',
  templateUrl: './book-delete-dialog.component.html',
  styleUrls: ['./book-delete-dialog.component.scss'],
})
export class BookDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BookDeleteDialogComponent>) {}

  public ngOnInit(): void {}

  public delete(): void {
    this.dialogRef.close('delete');
  }

  public cancel(): void {
    this.dialogRef.close('cancel');
  }
}
