import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToReadBookComponent } from './to-read-book.component';

describe('ToReadBookComponent', () => {
  let component: ToReadBookComponent;
  let fixture: ComponentFixture<ToReadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ToReadBookComponent,
        BookHeaderComponent,
      ],
      imports: [
        FormattingModule,
        RouterTestingModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
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

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(ToReadBookComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('Should render with minimum of data', () => {
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

      expect(element.querySelector<HTMLDivElement>('.book-line__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__name').innerText).toContain(book.name);

      expect(element.querySelector<HTMLDivElement>('.book-line__authors')).toBeFalsy();
    });

    it('Should render with full filled data', () => {
      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        startDate: '2020-10-10',
        doneUnits: 50,
        totalUnits: 100,
        authors: ['author1', 'author2'],
        status: 1,
        type: 2,
      });
      component.book = book;

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('.book-line__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__name').innerText).toContain(book.name);

      expect(element.querySelector<HTMLDivElement>('.book-line__authors')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__authors').innerText).toContain('author1');
      expect(element.querySelector<HTMLDivElement>('.book-line__authors').innerText).toContain('author2');

      expect(component).toBeTruthy();
    });
  });
});
