import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { BookViewComponent } from './book-view.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { BookEditViewComponent } from '../book-edit-view/book-edit-view.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { BookStatus } from '../../models/book-status';
import { DateUtils } from '../../../../main/utils/date-utils';
import { BookOriginService } from '../../services/book.origin.service';
import { BookStorageService } from '../../services/book.storage.service';
import { UUIDGenerator } from 'essents';
import { UiModalService } from 'bookolog-ui-kit';
import { BookPagesProgressComponent } from '../book-pages-progress/book-pages-progress.component';
import { BookTimeProgressComponent } from '../book-time-progress/book-time-progress.component';
import { MetrikaModule } from '../../../metrika/metrika.module';
import { MetrikaService } from '../../../metrika/services/metrika.service';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  let element: HTMLElement;
  let bookService: BookService;
  let metrika: MetrikaService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookViewComponent, BookPagesProgressComponent, BookTimeProgressComponent],
      imports: [FormattingModule, RouterTestingModule, HttpClientTestingModule, MetrikaModule],
      providers: [
        { provide: UiModalService, useValue: {} },
        BookService,
        { provide: BookOriginService, useValue: {} },
        { provide: BookStorageService, useValue: {} },
        { provide: UUIDGenerator, useValue: {} },
      ],
    })
      .overrideComponent(BookEditViewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    bookService = TestBed.inject(BookService);
    metrika = TestBed.inject(MetrikaService);
  });

  it('Creating', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {
    it('Name', () => {
      component.book = new Book({
        name: 'book name',
      } as any);

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('.book__name .property__value').innerText).toEqual('book name');
    });

    describe('Authors', () => {
      it('should render', () => {
        component.book = new Book({
          authors: ['One', 'two', 'another author'],
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__authors .property__value').innerText).toEqual('One, Two, Another author');
      });

      it('should not render', () => {
        component.book = new Book({
          authors: [],
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__authors')).toBeFalsy();
      });
    });

    describe('Book year', () => {
      it('should render', () => {
        component.book = new Book({
          year: 1997,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__year .property__value').innerText).toEqual('1997');
      });

      it('should not render', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__year')).toBeFalsy();
      });
    });

    describe('Type', () => {
      it('Paper', () => {
        component.book = new Book({
          type: BookType.Paper,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__type .property__value').innerText).toEqual('Бумажная книга');
      });

      it('Electronic', () => {
        component.book = new Book({
          type: BookType.Electronic,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__type .property__value').innerText).toEqual('Электронная книга');
      });

      it('Audio', () => {
        component.book = new Book({
          type: BookType.Audio,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__type .property__value').innerText).toEqual('Аудиокнига');
      });
    });

    describe('Genre', () => {
      it('should render', () => {
        component.book = new Book({
          genre: 'genre',
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__genre .property__value').innerText).toEqual('Genre');
      });

      it('should not render', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__genre')).toBeFalsy();
      });
    });

    describe('Collection', () => {
      it('should render', () => {
        component.book = new Book({} as any);

        component.book.collection = {
          name: 'collection',
        } as any;

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__collection .property__value').innerText).toEqual('Collection');
      });

      it('should not render', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__collection')).toBeFalsy();
      });
    });

    describe('Status', () => {
      it('Paper', () => {
        component.book = new Book({
          status: BookStatus.ToRead,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__status .property__value').innerText).toEqual('К прочтению');
      });

      it('InProgress', () => {
        component.book = new Book({
          status: BookStatus.InProgress,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__status .property__value').innerText).toEqual('Читаю');
      });

      it('Done', () => {
        component.book = new Book({
          status: BookStatus.Done,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__status .property__value').innerText).toEqual('Прочитана');
      });
    });

    describe('Tags', () => {
      it('should render', () => {
        component.book = new Book({
          tags: ['One', 'two', 'another tag'],
        } as any);

        fixture.detectChanges();

        component.book.tags.forEach(item => {
          expect(element.querySelector<HTMLDivElement>('.book__tags .property__value').innerHTML).toContain(item);
        });
      });

      it('should not render', () => {
        component.book = new Book({
          tags: [],
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__tags')).toBeFalsy();
      });
    });

    describe('Progress', () => {
      it('should render paper progress', () => {
        component.book = new Book({
          doneUnits: 100,
          totalUnits: 500,
          status: BookStatus.InProgress,
          type: BookType.Paper,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeTruthy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')).toBeTruthy();
        expect(
          element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')?.innerText,
        ).toContain('100 страниц из 500');
      });

      it('should render time progress', () => {
        component.book = new Book({
          doneUnits: 100,
          totalUnits: 500,
          status: BookStatus.InProgress,
          type: BookType.Audio,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeTruthy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-time-progress')).toBeTruthy();
        expect(
          element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-time-progress')?.innerText,
        ).toContain('01:40 из 08:20');
      });

      it('should not render only for totalUnits', () => {
        component.book = new Book({
          doneUnits: null,
          totalUnits: 500,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeFalsy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')).toBeFalsy();
      });

      it('should not render only for doneUnits', () => {
        component.book = new Book({
          doneUnits: 10,
          totalUnits: null,
          status: BookStatus.InProgress,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeFalsy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')).toBeFalsy();
      });

      it('should not render for empty progress', () => {
        component.book = new Book({
          doneUnits: null,
          totalUnits: null,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeFalsy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')).toBeFalsy();
      });

      it('should not render for Done status', () => {
        component.book = new Book({
          doneUnits: 10,
          totalUnits: 20,
          status: BookStatus.Done,
          type: BookType.Paper,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value ui-progress-bar')).toBeFalsy();
        expect(element.querySelector<HTMLDivElement>('.book__progress .property__label__extended app-book-pages-progress')).toBeFalsy();
      });
    });

    describe('Start Date', () => {
      it('should render for done book', () => {
        component.book = new Book({
          startDate: new Date('2020-01-02'),
          status: BookStatus.Done,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__start-date .property__value').innerText).toEqual('1/2/20');
      });

      it('should render for progress book', () => {
        component.book = new Book({
          startDate: new Date('2020-01-02'),
          status: BookStatus.InProgress,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__start-date .property__value').innerText).toEqual('1/2/20');
      });

      it('should not render for to read book', () => {
        component.book = new Book({
          startDate: new Date('2020-01-02'),
          status: BookStatus.ToRead,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__start-date')).toBeFalsy();
      });

      it('should not render for empty date', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__start-date')).toBeFalsy();
      });
    });

    describe('End Date', () => {
      it('should render for done book', () => {
        component.book = new Book({
          endDate: new Date('2020-01-02'),
          status: BookStatus.Done,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__end-date .property__value').innerText).toEqual('1/2/20');
      });

      it('should not render for progress book', () => {
        component.book = new Book({
          endDate: new Date('2020-01-02'),
          status: BookStatus.InProgress,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__end-date')).toBeFalsy();
      });

      it('should not render for to read book', () => {
        component.book = new Book({
          endDate: new Date('2020-01-02'),
          status: BookStatus.ToRead,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__end-date')).toBeFalsy();
      });

      it('should not render for empty date', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__end-date')).toBeFalsy();
      });
    });

    describe('Note', () => {
      it('should render', () => {
        component.book = new Book({
          note: 'note',
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__note .property__value').innerText).toEqual('note');
      });

      it('should not render', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__note')).toBeFalsy();
      });
    });

    describe('Buttons', () => {
      describe('Mark inProgress', () => {
        it('should render for toRead book', () => {
          component.book = new Book({ status: BookStatus.ToRead } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-progress')).toBeTruthy();
        });

        it('should not render for InProgress book', () => {
          component.book = new Book({ status: BookStatus.InProgress } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-progress')).toBeFalsy();
        });

        it('should not render for Done book', () => {
          component.book = new Book({ status: BookStatus.Done } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-progress')).toBeFalsy();
        });
      });

      describe('Mark done', () => {
        it('should not render for toRead book', () => {
          component.book = new Book({ status: BookStatus.ToRead } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-done')).toBeFalsy();
        });

        it('should not render for InProgress book', () => {
          component.book = new Book({ status: BookStatus.InProgress } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-done')).toBeTruthy();
        });

        it('should not render for Done book', () => {
          component.book = new Book({ status: BookStatus.Done } as any);

          fixture.detectChanges();

          expect(element.querySelector<HTMLElement>('.mark-as-done')).toBeFalsy();
        });
      });
    });
  });

  describe('Actions', () => {
    describe('Status actions', () => {
      let updateSpy: jasmine.Spy = null;

      beforeEach(() => {
        updateSpy = spyOn(bookService, 'saveOrUpdate');
      });

      it('markAsProgress', async () => {
        const metrikaSpy = spyOn(metrika, 'fireBookUpdate');
        const book = {
          status: BookStatus.ToRead,
        } as Book;

        await component.markAsProgress(book);

        expect(updateSpy).toHaveBeenCalledOnceWith({
          status: BookStatus.InProgress,
          started: DateUtils.today,
        } as Book);

        expect(metrikaSpy).toHaveBeenCalledWith();
      });

      it('markAsProgress', async () => {
        const metrikaSpy = spyOn(metrika, 'fireBookUpdate');
        const book = {
          status: BookStatus.InProgress,
          totalUnits: 100,
        } as Book;

        await component.markAsDone(book);

        expect(updateSpy).toHaveBeenCalledOnceWith({
          status: BookStatus.Done,
          doneUnits: 100,
          totalUnits: 100,
          finished: DateUtils.today,
        } as Book);

        expect(metrikaSpy).toHaveBeenCalledWith();
      });

      it('deleteBook', async () => {
        const metrikaSpy = spyOn(metrika, 'fireBookDelete');
        const deleteSpy = spyOn(bookService, 'delete');
        const book = {
          guid: 'guid',
        } as Book;

        await component.deleteBook(book);

        expect(deleteSpy).toHaveBeenCalledOnceWith({
          guid: 'guid',
        } as Book);

        expect(metrikaSpy).toHaveBeenCalledWith();
      });
    });
  });
});
