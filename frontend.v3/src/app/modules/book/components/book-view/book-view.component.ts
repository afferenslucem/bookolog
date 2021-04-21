import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { BookDeleteDialogComponent, DeleteDialogResult } from '../book-delete-dialog/book-delete-dialog.component';
import _ from 'declarray';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewComponent implements OnInit, OnDestroy {
  public book: Book;
  public doneReadings: Book[];

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  public destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    public dialog: MatDialog,
    private bookService: BookService,
    private router: Router,
  ) {
    activatedRoute.data.subscribe(data => {
      this.book = data.book;
      this.doneReadings = _((data.readings as Book[]) || [])
        .where((item: Book) => item.status === BookStatus.Done)
        .toArray();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.titleService.setBook();
  }

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
}
