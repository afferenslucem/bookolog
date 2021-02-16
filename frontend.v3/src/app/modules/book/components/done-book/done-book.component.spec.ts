import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { DoneBookComponent } from './done-book.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';

describe('DoneBookComponent', () => {
  let component: DoneBookComponent;
  let fixture: ComponentFixture<DoneBookComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [
        DoneBookComponent,
        DateRangeComponent,
        BookHeaderComponent,
        BookAuthorsComponent,
      ],
      imports: [
        FormattingModule,
        RouterTestingModule,
      ],
    })
      .compileComponents();
  });

  describe('Creation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DoneBookComponent);
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
      fixture = TestBed.createComponent(DoneBookComponent);
      component = fixture.componentInstance;
    });

    it('Should return book name', () => {
      component.book = new Book({
        name: 'book name'
      } as any);

      expect(component.name).toEqual('book name');
    });

    it('Should return book authors', () => {
      component.book = new Book({
        authors: [ 'One', 'Two' ]
      } as any);

      expect(component.authors).toEqual([ 'One', 'Two' ]);
    });

    it('Should return book startDate', () => {
      component.book = new Book({
        startDate: new Date('2011-01-02')
      } as any);

      expect(component.startDate).toEqual(new Date('2011-01-02'));
    });

    it('Should return book endDate', () => {
      component.book = new Book({
        endDate: new Date('2011-01-02')
      } as any);

      expect(component.endDate).toEqual(new Date('2011-01-02'));
    });
  });

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(DoneBookComponent);
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
          startDate: '2011-01-01'
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeTruthy();

        expect(component).toBeTruthy();
      });
    });

    it('Should render progress dates for only end date', () => {
      component.book = new Book({
        endDate: '2011-01-01'
      } as any);

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeTruthy();

      expect(component).toBeTruthy();
    });

    it('Should render progress dates for both dates', () => {
      component.book = new Book({
        startDate: '2011-01-01',
        endDate: '2011-01-01',
      } as any);

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeTruthy();

      expect(component).toBeTruthy();
    });

    it('Should not render progress dates for no one date', () => {
      component.book = new Book({} as any);

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('app-date-range')).toBeFalsy();

      expect(component).toBeTruthy();
    });
  });
})

