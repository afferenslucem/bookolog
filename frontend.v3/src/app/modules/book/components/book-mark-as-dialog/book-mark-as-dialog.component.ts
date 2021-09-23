import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, ModalRef } from 'bookolog-ui-kit';

export class MarkDialogData {
  statusName: string;
}

export type MarkDialogResult = 'mark' | 'cancel';

@Component({
  selector: 'app-book-mark-as-dialog',
  templateUrl: './book-mark-as-dialog.component.html',
  styleUrls: ['./book-mark-as-dialog.component.scss'],
})
export class BookMarkAsDialogComponent implements OnInit {
  constructor(private dialogRef: ModalRef<BookMarkAsDialogComponent>, @Inject(DIALOG_DATA) private data: MarkDialogData) {}

  public get statusName(): string {
    return this.data?.statusName;
  }

  public ngOnInit(): void {}

  public mark(): void {
    this.dialogRef.close('mark');
  }

  public cancel(): void {
    this.dialogRef.close('cancel');
  }
}
