import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { BookDeleteDialogComponent, DeleteDialogResult } from '../book-delete-dialog/book-delete-dialog.component';
import _ from 'declarray';
import { DateUtils } from '../../../../main/utils/date-utils';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent implements OnInit, OnDestroy {
  public book: Book;
  public doneReadings: Book[];

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  public destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
    activatedRoute.data.subscribe(data => this.onDataInit(data));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public ngOnInit(): void {}

  public openDeleteDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookDeleteDialogComponent, {
      width: '90%',
      maxWidth: '300px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((item?: DeleteDialogResult) => item && item === 'delete'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => void this.onDelete(book));
  }

  public async onDelete(book: Book): Promise<void> {
    await this.deleteBook(book);
    await this.redirect();
  }

  public async deleteBook(book: Book): Promise<void> {
    await this.bookService.delete(book);
  }

  public async markAsProgress(book: Book): Promise<void> {
    book.started = DateUtils.today;
    book.status = BookStatus.InProgress;

    await this.bookService.saveOrUpdate(book);
    await this.reload();
  }

  public async markAsDone(book: Book): Promise<void> {
    book.finished = DateUtils.today;
    book.doneUnits = book.totalUnits;
    book.status = BookStatus.Done;

    await this.bookService.saveOrUpdate(book);
    await this.reload();
  }

  public async redirect(): Promise<void> {
    switch (this.book.status) {
      case BookStatus.InProgress: {
        await this.router.navigate(['/in-progress']);
        break;
      }
      case BookStatus.Done: {
        await this.router.navigate(['/done']);
        break;
      }
      case BookStatus.ToRead: {
        await this.router.navigate(['/to-read']);
        break;
      }
    }
  }

  public async reload(): Promise<void> {
    await this.router.navigate(['.'], { relativeTo: this.activatedRoute });
  }

  private onDataInit(data: Data): void {
    this.book = data.book;
    this.doneReadings = _((data.readings as Book[]) || [])
      .where((item: Book) => item.status === BookStatus.Done)
      .toArray();
  }
}
