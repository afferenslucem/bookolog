import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { BookViewComponent } from './book-view.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { BookEditViewComponent } from '../book-edit-view/book-edit-view.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { BookStatus } from '../../models/book-status';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookViewComponent],
      imports: [FormattingModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: BookService, useValue: {} },
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
      it('should render', () => {
        component.book = new Book({
          doneUnits: 100,
          totalUnits: 500,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value mat-progress-bar')).toBeTruthy();
      });

      it('should not render', () => {
        component.book = new Book({
          doneUnits: null,
          totalUnits: 500,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value mat-progress-bar')).toBeFalsy();
      });

      it('should not render', () => {
        component.book = new Book({
          doneUnits: 10,
          totalUnits: null,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value mat-progress-bar')).toBeFalsy();
      });

      it('should not render', () => {
        component.book = new Book({
          doneUnits: null,
          totalUnits: null,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book__progress .property__value mat-progress-bar')).toBeFalsy();
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
  });
});
