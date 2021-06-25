import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormattingModule } from '../../../formatting/formatting.module';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookRereadFormComponent } from './book-reread-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UUIDGeneratorService } from '../../../../main/services/u-u-i-d-generator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookStatus } from '../../models/book-status';
import { BookData } from '../../models/book-data';
import { BookDate } from '../../models/book-date';
import { CollectionService } from '../../../collection/services/collection.service';
import { BookService } from '../../services/book.service';

const book: Book = new Book({
  name: 'name',
  authors: ['Author1', 'Au Thor2'],
  type: BookType.Audio,
  progressType: ProgressAlgorithmType.Left,
  modifyDate: '2020-11-18 10:57',
  createDate: '2020-11-18 10:57',
  status: 1,
} as BookData);

const data = new Subject<any>();

const activatedRoute: ActivatedRoute = {
  data,
} as any;

describe('BookRereadFormComponent', () => {
  let component: BookRereadFormComponent;
  let fixture: ComponentFixture<BookRereadFormComponent>;
  let element: HTMLDivElement = null;

  let bookService: BookService = null;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookRereadFormComponent],
      imports: [FormattingModule, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: UUIDGeneratorService, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRereadFormComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    bookService = TestBed.inject(BookService);

    component.onDataInit({ book });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print info', () => {
    const nameEl = element.querySelector<HTMLDivElement>('.book__name .property__value');
    const nameValue = nameEl.innerText;

    const authorEls = element.querySelectorAll<HTMLDivElement>('.book__authors .property__value .author__value');
    const authorValues = Array.from(authorEls).map(item => item.innerText);

    expect(nameValue).toEqual(book.name);
    expect(authorValues).toEqual(book.authors);
  });

  describe('Form initialize', () => {
    it('type', () => {
      const expectedType = component.bookForm.type;

      expect(expectedType).toEqual(book.type);
    });

    it('status', () => {
      const expectedStatus = component.bookForm.status;

      expect(expectedStatus).toEqual(BookStatus.ToRead);
    });

    it('started', () => {
      const expectedStarted = component.bookForm.started;

      expect(expectedStarted).toEqual(
        new BookDate({
          year: null,
          month: null,
          day: null,
        }),
      );
    });

    it('finished', () => {
      const expectedFinished = component.bookForm.finished;

      expect(expectedFinished).toEqual(
        new BookDate({
          year: null,
          month: null,
          day: null,
        }),
      );
    });

    it('doneUnits', () => {
      const expectedDone = component.bookForm.doneUnits;

      expect(expectedDone).toEqual(null);
    });

    it('totalUnits', () => {
      const expectedTotal = component.bookForm.totalUnits;

      expect(expectedTotal).toEqual(null);
    });
  });

  describe('redirect', () => {
    let router: Router = null;
    let navigateSpy: jasmine.Spy = null;

    beforeEach(() => {
      router = TestBed.inject(Router);
      navigateSpy = spyOn(router, 'navigate');
    });

    it('to progress books', () => {
      component.bookForm.status = BookStatus.InProgress;
      component.redirectToList();

      expect(navigateSpy).toHaveBeenCalledOnceWith(['in-progress']);
    });

    it('to done books', () => {
      component.bookForm.status = BookStatus.Done;
      component.redirectToList();

      expect(navigateSpy).toHaveBeenCalledOnceWith(['done']);
    });

    it('to to read books', () => {
      component.bookForm.status = BookStatus.ToRead;
      component.redirectToList();

      expect(navigateSpy).toHaveBeenCalledOnceWith(['to-read']);
    });
  });

  describe('touchCollectionIfExists', () => {
    let collectionService: CollectionService = null;
    let touchSpy: jasmine.Spy = null;

    beforeEach(() => {
      collectionService = TestBed.inject(CollectionService);
      touchSpy = spyOn(collectionService, 'updateModifyTime');
    });

    it('should touch', async () => {
      await component.touchCollectionIfExists({
        collectionGuid: 'guid1',
      } as Book);

      expect(touchSpy).toHaveBeenCalledOnceWith('guid1');
    });

    it('should ignore', async () => {
      await component.touchCollectionIfExists({
        collectionGuid: undefined,
      } as Book);

      expect(touchSpy).not.toHaveBeenCalled();
    });
  });

  it('processBook', async () => {
    const saveSpy = spyOn(bookService, 'saveRereading').and.resolveTo();

    const reread: Book = {
      rereadingBookGuid: undefined,
      guid: 'guid1',
    } as any;

    await component.processBook(reread);

    expect(saveSpy).toHaveBeenCalledOnceWith(reread);
    expect(reread.guid).toEqual(undefined);
    expect(reread.rereadingBookGuid).toEqual('guid1');
  });
});
