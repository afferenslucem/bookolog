import { Component, OnInit } from '@angular/core';
import { ModalRef } from 'ui-kit';

export type DeleteDialogResult = 'delete' | 'cancel';

@Component({
  selector: 'app-book-delete-dialog',
  templateUrl: './book-delete-dialog.component.html',
  styleUrls: ['./book-delete-dialog.component.scss'],
})
export class BookDeleteDialogComponent implements OnInit {
  constructor(private dialogRef: ModalRef<BookDeleteDialogComponent>) {}

  public ngOnInit(): void {}

  public delete(): void {
    this.dialogRef.close('delete');
  }

  public cancel(): void {
    this.dialogRef.close('cancel');
  }
}
