import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { BookDeleteDialogComponent, DeleteDialogResult } from '../book-delete-dialog/book-delete-dialog.component';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewComponent implements OnInit, OnDestroy {
  public book$: Observable<Book> = new Observable<Book>();

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  public destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, public titleService: TitleService, public dialog: MatDialog, private bookService: BookService) {
    this.book$ = activatedRoute.data.pipe(
      map(data => data.book)
    );
  }

  ngOnDestroy(): void {
      this.destroy$.next();
  }

  ngOnInit(): void {
    this.titleService.setBook();
  }

  public getProgressValue(book: Book): number {
    if (!!book.totalUnits && !!book.doneUnits) {
      return Math.floor(book.doneUnits / book.totalUnits * 100);
    } else {
      return 0;
    }
  }

  public openDeleteDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookDeleteDialogComponent, {
      width: '90%',
      maxWidth: '300px',
    });

    dialogRef.afterClosed().pipe(
      filter((item?: DeleteDialogResult) => item && item === 'delete'),
      takeUntil(this.destroy$),
    ).subscribe(() => this.deleteBook(book));
  }

  public deleteBook(book: Book): void {
    this.bookService.deleteBook(book);
  }
}
