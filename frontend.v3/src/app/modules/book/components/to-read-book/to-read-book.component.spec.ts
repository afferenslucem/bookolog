import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookAuthorsComponent } from '../book-authors/book-authors.component';
import { ToReadBookComponent } from './to-read-book.component';

describe('InProgressBookComponent', () => {
  let component: ToReadBookComponent;
  let fixture: ComponentFixture<ToReadBookComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ToReadBookComponent, DateRangeComponent, BookHeaderComponent, BookAuthorsComponent],
      imports: [FormattingModule, RouterTestingModule],
    }).compileComponents();
  });

  describe('Creation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ToReadBookComponent);
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
      fixture = TestBed.createComponent(ToReadBookComponent);
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
  });

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(ToReadBookComponent);
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
  });
});
