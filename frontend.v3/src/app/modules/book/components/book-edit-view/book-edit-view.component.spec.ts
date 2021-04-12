import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormattingModule} from '../../../formatting/formatting.module';
import {TestCore} from '../../../../main/test/test-core.spec';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {UUIDGeneratorService} from '../../../../main/services/u-u-i-d-generator.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Book} from '../../models/book';
import {BookType} from '../../models/book-type';
import {ProgressAlgorithmType} from '../../models/progress-algorithm-type';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookData} from '../../models/book-data';
import {BookService} from '../../services/book.service';
import {BookEditViewComponent} from './book-edit-view.component';
import {BookStatus} from '../../models/book-status';
import {Action} from '../../../../main/resolvers/action.resolver';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {InputsModule} from '../../../inputs/inputs.module';
import {MatInputModule} from '@angular/material/input';
import {TitleService} from '../../../ui/service/title.service';
import {DateUtils} from '../../../../main/utils/date-utils';

const book: Book = new Book({
  name: 'name',
  authors: ['Author1', 'Au Thor2'],
  type: BookType.Audio,
  progressType: ProgressAlgorithmType.Left,
  modifyDate: '2020-11-18 10:57',
  createDate: '2020-11-18 10:57',
  status: 1,
} as BookData);

const series: string[] = ['series1', 'series2'];
const allBooks: Book[] = [];

const data = new Subject<any>();

const activatedRoute: ActivatedRoute = {
  data,
} as any;

describe('BookEditViewComponent', () => {
  let component: BookEditViewComponent;
  let fixture: ComponentFixture<BookEditViewComponent>;
  let element: HTMLDivElement = null;

  let bookService: BookService = null;
  let titleService: TitleService = null;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookEditViewComponent],
      imports: [
        FormattingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        InputsModule,
        MatInputModule,
        FormattingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: UUIDGeneratorService, useValue: {}},
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BookEditViewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    bookService = TestBed.inject(BookService);
    titleService = TestBed.inject(TitleService);

    component.onDataInit({
      series,
      allBooks,
      status: BookStatus.InProgress,
      action: Action.Edit
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('readAction', () => {
    it('should set create title', () => {
      const setCreateTitleSpy = spyOn(titleService, 'setBookCreate');

      component.readAction(Action.Create);

      expect(component.action).toEqual(Action.Create);
      expect(setCreateTitleSpy).toHaveBeenCalledOnceWith();
    });

    it('should set edit title', () => {
      const setCreateTitleSpy = spyOn(titleService, 'setBookEdit');

      component.readAction(Action.Edit);

      expect(component.action).toEqual(Action.Edit);
      expect(setCreateTitleSpy).toHaveBeenCalledOnceWith();
    });
  });

  describe('onStatusChange', () => {
    it('should set current data to started', () => {
      component.book.status = BookStatus.ToRead;
      component.bookForm.started = null;

      component.onStatusChange(BookStatus.InProgress);

      expect(component.bookForm.started).toEqual(DateUtils.today);
    });

    it('should set current data to finished and set done', () => {
      component.bookForm.finished = null;
      component.bookForm.doneUnits = null;
      component.bookForm.totalUnits = 100;
      component.book.status = BookStatus.InProgress;

      component.onStatusChange(BookStatus.Done);

      expect(component.bookForm.finished).toEqual(DateUtils.today);
      expect(component.bookForm.finished).toEqual(DateUtils.today);
    });
  });
});