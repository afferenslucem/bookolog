import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';
import { BookType } from '../../models/book-type';
import { BookService } from '../../services/book.service';
import { BookDeleteDialogComponent, DeleteDialogResult } from '../book-delete-dialog/book-delete-dialog.component';
import _ from 'declarray';
import { DateUtils } from '../../../../main/utils/date-utils';
import { DestroyService, UiModalService } from 'bookolog-ui-kit';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BrokenConnectionError } from '../../../../main/models/errors/broken-connection-error';
import { NotificationService } from '../../../notification/services/notification.service';
import { BookMarkAsDialogComponent, MarkDialogResult } from '../book-mark-as-dialog/book-mark-as-dialog.component';
import { defaultModalConfig } from '../../../../main/utils/modal-config';
import { MetrikaService } from '../../../metrika/services/metrika.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  providers: [DestroyService, UiModalService],
})
export class BookViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  public book: Book;
  public doneReadings: Book[];

  public BookType: typeof BookType = BookType;

  public BookStatus: typeof BookStatus = BookStatus;

  constructor(
    private activatedRoute: ActivatedRoute,
    public modal: UiModalService,
    private destroy$: DestroyService,
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private notificationService: NotificationService,
    private metrika: MetrikaService,
  ) {
    activatedRoute.data.subscribe(data => this.onDataInit(data));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public ngOnInit(): void {}

  public openDeleteDialog(book: Book): void {
    const dialogRef = this.modal.open(BookDeleteDialogComponent, null, defaultModalConfig);

    dialogRef.close$
      .pipe(
        map(item => item as DeleteDialogResult),
        filter((item?: DeleteDialogResult) => item === 'delete'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => void this.onDelete(book));
  }

  public openMarkAsProgressDialog(book: Book): void {
    const dialogRef = this.modal.open(BookMarkAsDialogComponent, { statusName: 'Читаю' }, defaultModalConfig);

    dialogRef.close$
      .pipe(
        map(item => item as MarkDialogResult),
        filter((item?: MarkDialogResult) => item === 'mark'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => void this.markAsProgress(book));
  }

  public openMarkAsDoneDialog(book: Book): void {
    const dialogRef = this.modal.open(BookMarkAsDialogComponent, { statusName: 'Прочитана' }, defaultModalConfig);

    dialogRef.close$
      .pipe(
        map(item => item as MarkDialogResult),
        filter((item?: MarkDialogResult) => item === 'mark'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => void this.markAsDone(book));
  }

  public async onDelete(book: Book): Promise<void> {
    await this.deleteBook(book);
    await this.redirect();
  }

  public async deleteBook(book: Book): Promise<void> {
    try {
      await this.bookService.delete(book);
      this.metrika.fireBookDelete();
    } catch (e) {
      if (e instanceof BrokenConnectionError) {
        this.notificationService.createWarningNotification('Книга удалена локально');
      } else {
        this.notificationService.createWarningNotification('Ошибка удаления книги');
      }
    }
  }

  public async markAsProgress(book: Book): Promise<void> {
    book.started = DateUtils.today;
    book.status = BookStatus.InProgress;

    await this.bookService.saveOrUpdate(book);
    this.metrika.fireBookUpdate();
    await this.reload();
  }

  public async markAsDone(book: Book): Promise<void> {
    book.finished = DateUtils.today;
    book.doneUnits = book.totalUnits;
    book.status = BookStatus.Done;

    await this.bookService.saveOrUpdate(book);
    this.metrika.fireBookUpdate();
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

  public ngAfterViewInit(): void {
    this.modal.registerContainerRef(this.container);
  }

  private onDataInit(data: Data): void {
    this.book = data.book;
    this.doneReadings = _((data.readings as Book[]) || [])
      .where((item: Book) => item.status === BookStatus.Done)
      .toArray();
  }
}
