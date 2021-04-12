import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {getConsoleLogger} from '../../../../main/app.logging';
import {NotificationService} from '../../../notification/services/notification.service';
import {TitleService} from '../../../ui/service/title.service';
import {Book} from '../../models/book';
import {BookStatus} from '../../models/book-status';
import {BookService} from '../../services/book.service';
import {BookDate} from '../../models/book-date';
import {BookDataForm} from '../../utils/book-data-form';
import {AbstractBookDataForm} from '../../utils/abstract-book-data-form';
import {CollectionService} from '../../../collection/services/collection.service';

@Component({
  selector: 'app-book-reread-form',
  templateUrl: './book-reread-form.component.html',
  styleUrls: ['./book-reread-form.component.scss'],
})
export class BookRereadFormComponent extends AbstractBookDataForm implements OnInit {
  private logger = getConsoleLogger('BookRereadFormComponent');

  constructor(
    private notificationService: NotificationService,
    public activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    collectionService: CollectionService,
    router: Router,
  ) {
    super(router, collectionService);

    activatedRoute.data.subscribe(data => this.onDataInit(data));
  }

  public onDataInit(data: Data): void {
    this.createForm(data.book);

    this.book.status = BookStatus.ToRead;
    this.book.started = new BookDate();
    this.book.finished = new BookDate();
    this.book.doneUnits = null;
    this.book.totalUnits = null;

    this.bookForm.build();

    this.bookForm.typeChanges.subscribe(() => this.onTypeChange());
  }

  public ngOnInit(): void {
    this.titleService.setBookReread();
  }

  public async submit(): Promise<void> {
    try {
      const data = this.value;
      const result = await this.processBook(data);
      await this.touchCollectionIfExists(result);

      await this.redirect();
    } catch (e) {
      this.logSaveError(e);
    }
  }

  public async processBook(book: Book): Promise<Book> {
    book.rereadingBookGuid = book.guid;
    book.guid = undefined;
    const result = await this.bookService.saveRereading(book);
    return result;
  }

  private logSaveError(e: any): void {
    this.logger.error('Book save error', e);
    this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
      autoclose: false,
    });
  }

  private createForm(book: Book): void {
    this.bookForm = new BookDataForm(book);
  }

  private onTypeChange(): void {
    this.bookForm.progressType = this.progressAlgorithmPreference;
  }
}
