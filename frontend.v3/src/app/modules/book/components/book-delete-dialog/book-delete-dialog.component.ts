import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export type DeleteDialogResult = 'delete' | 'cancel';

@Component({
  selector: 'app-book-delete-dialog',
  templateUrl: './book-delete-dialog.component.html',
  styleUrls: ['./book-delete-dialog.component.scss']
})
export class BookDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookDeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  delete() {
    this.dialogRef.close('delete');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
