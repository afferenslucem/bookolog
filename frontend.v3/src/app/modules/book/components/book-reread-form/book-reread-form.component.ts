import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {getConsoleLogger} from '../../../../main/app.logging';
import {Action} from '../../../../main/resolvers/action.resolver';
import {DateUtils} from '../../../../main/utils/date-utils';
import {NotificationService} from '../../../notification/services/notification.service';
import {TitleService} from '../../../ui/service/title.service';
import {Book} from '../../models/book';
import {BookStatus} from '../../models/book-status';
import {BookType} from '../../models/book-type';
import {BookService} from '../../services/book.service';
import {Location} from '@angular/common';
import {ProgressAlgorithmType} from '../../models/progress-algorithm-type';
import {BookDate} from '../../models/book-date';
import {ProgressAlgorithmSolver} from '../../utils/progress-algorithm-solver';
import {BookDataForm} from '../../utils/book-data-form';

@Component({
  selector: 'app-book-reread-form',
  templateUrl: './book-reread-form.component.html',
  styleUrls: ['./book-reread-form.component.scss'],
})
export class BookRereadFormComponent implements OnInit {
  public BookType: typeof BookType = BookType;
  public BookStatus: typeof BookStatus = BookStatus;
  public ProgressAlgorithm: typeof ProgressAlgorithmType = ProgressAlgorithmType;
  public bookForm: BookDataForm = null;
  private logger = getConsoleLogger('BookRereadFormComponent');
  private action: Action;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public titleService: TitleService,
    private bookService: BookService,
    private location: Location,
    private router: Router,
  ) {
    activatedRoute.data.subscribe(data => {
      this.formFromBook(data.book);

      this.bookForm.status = BookStatus.ToRead;
      this.bookForm.started = new BookDate();
      this.bookForm.finished = new BookDate();
      this.bookForm.doneUnits = null;
      this.bookForm.totalUnits = null;
    });
  }

  public get progressAlgorithmPreference(): ProgressAlgorithmType {
    return ProgressAlgorithmSolver.getAlgorithm(this.bookForm.type);
  }

  public ngOnInit(): void {
    this.titleService.setBookReread();
  }

  public async submit(): Promise<void> {
    try {
      const data = Object.assign(this.book, this.form.value) as Book;

      if (data.doneUnits) {
        data.done = data.doneUnits;
      }

      data.modifyDate = DateUtils.nowUTC;

      if (!data.createDate) {
        data.createDate = DateUtils.nowUTC;
      }

      data.rereadingBookGuid = data.guid;
      data.guid = undefined;

      await this.bookService.saveRereading(data);

      if (this.action === Action.Create) {
        await this.redirect();
      } else {
        this.location.back();
      }
    } catch (e) {
      this.logger.error('Book save error', e);
      this.notificationService.createErrorNotification('Не удалось сохранить книгу', {
        autoclose: false,
      });
    }
  }

  private async redirect(): Promise<void> {
    switch (this.book.status) {
      case BookStatus.ToRead: {
        await this.router.navigate(['/to-read']);
        return;
      }
      case BookStatus.Done: {
        await this.router.navigate(['done']);
        return;
      }
      case BookStatus.InProgress: {
        await this.router.navigate(['in-progress']);
        return;
      }
    }
  }

  private formFromBook(book: Book): void {
    this.bookForm = new BookDataForm(book);

    this.bookForm.registerOnTypeChange(() => this.onTypeChange());
  }

  private onTypeChange(): void {
    this.bookForm.progressType = this.progressAlgorithmPreference;
  }

  public get form(): FormGroup {
    return this.bookForm.form;
  }

  public get status(): BookStatus {
    return this.bookForm.status;
  }

  public get type(): BookType {
    return this.bookForm.type;
  }

  public get progressAlgorithm(): ProgressAlgorithmType {
    return this.bookForm.progressType;
  }

  public get book(): Book {
    return this.bookForm.snapshot;
  }
}
