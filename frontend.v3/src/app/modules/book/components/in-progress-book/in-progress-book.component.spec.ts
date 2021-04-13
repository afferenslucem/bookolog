import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';
import { InProgressBookComponent } from './in-progress-book.component';
import { BookType } from '../../models/book-type';
import { ChangeDetectionStrategy } from '@angular/core';

describe('InProgressBookComponent', () => {
  let component: InProgressBookComponent;
  let fixture: ComponentFixture<InProgressBookComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [InProgressBookComponent, DateRangeComponent, BookHeaderComponent, BookAuthorsComponent],
      imports: [FormattingModule, RouterTestingModule],
    })
      .overrideComponent(InProgressBookComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  describe('Creation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InProgressBookComponent);
      component = fixture.componentInstance;

      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        status: 1,
        type: 1,
      });
      component.book = book;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Properties', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InProgressBookComponent);
      component = fixture.componentInstance;
    });

    it('Should return book name', () => {
      component.book = new Book({
        name: 'book name',
      } as any);

      expect(component.name).toEqual('book name');
    });

    it('Should return book authors', () => {
      component.book = new Book({
        authors: ['One', 'Two'],
      } as any);

      expect(component.authors).toEqual(['One', 'Two']);
    });

    it('Should return book startDate', () => {
      component.book = new Book({
        startDate: new Date('2011-01-02'),
      } as any);

      expect(component.startDate).toEqual(new Date('2011-01-02'));
    });

    it('Should return book done', () => {
      component.book = new Book({
        doneUnits: 42,
      } as any);

      expect(component.done).toEqual(42);
    });

    it('Should return book total', () => {
      component.book = new Book({
        totalUnits: 24,
      } as any);

      expect(component.total).toEqual(24);
    });

    describe('Progress', () => {
      it('Should return zero for empty done', () => {
        component.book = new Book({
          doneUnits: null,
          totalUnits: 100,
        } as any);

        expect(component.progressValue).toEqual(0);
      });

      it('Should return zero for empty total', () => {
        component.book = new Book({
          doneUnits: 100,
          totalUnits: 0,
        } as any);

        expect(component.progressValue).toEqual(0);
      });

      it('Should return 20', () => {
        component.book = new Book({
          doneUnits: 5,
          totalUnits: 25,
        } as any);

        const progressValue = component.progressValue;

        expect(progressValue).toEqual(20);
      });
    });
  });

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(InProgressBookComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    describe('Name', () => {
      it('Should render book name', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-header')).toBeTruthy();

        expect(component).toBeTruthy();
      });
    });

    describe('Authors', () => {
      it('Should render authors', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-authors')).toBeTruthy();

        expect(component).toBeTruthy();
      });
    });

    describe('Dates', () => {
      it('Should render progress dates for only start date', () => {
        component.book = new Book({
          startDate: '2011-01-01',
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeTruthy();

        expect(component).toBeTruthy();
      });

      it('Should render progress dates for no one date', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeFalsy();

        expect(component).toBeTruthy();
      });
    });

    describe('Progress', () => {
      it('Should render progress section for non-zero done and total', () => {
        component.book = new Book({
          doneUnits: 10,
          totalUnits: 10,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-pages-progress')).toBeTruthy();
        expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeFalsy();
      });

      it('Should not render progress section for only total', () => {
        component.book = new Book({
          totalUnits: 10,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-pages-progress')).toBeFalsy();
      });

      it('Should not render progress section for only done', () => {
        component.book = new Book({
          doneUnits: 10,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-pages-progress')).toBeFalsy();
      });

      it('Should not render progress section', () => {
        component.book = new Book({} as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-pages-progress')).toBeFalsy();
        expect(element.querySelector<HTMLDivElement>('.book-line__progress-data').innerText).toEqual('Нет даты');
      });

      it('Should render audio progress section', () => {
        component.book = new Book({
          doneUnits: 10,
          totalUnits: 10,
          type: BookType.Audio,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-book-time-progress')).toBeTruthy();
      });
    });
  });
});
