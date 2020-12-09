import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { DateRangeComponent } from '../date-range/date-range.component';

import { DoneBookComponent } from './done-book.component';

describe('DoneBookComponent', () => {
  let component: DoneBookComponent;
  let fixture: ComponentFixture<DoneBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DoneBookComponent,
        DateRangeComponent,
        BookHeaderComponent,
      ],
      imports: [
        FormattingModule,
        RouterTestingModule,
      ]
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

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(DoneBookComponent);
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

      expect(element.querySelector<HTMLDivElement>('.book-line__authors').attributes.getNamedItem('hidden')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data').attributes.getNamedItem('hidden')).toBeTruthy();

      expect(component).toBeTruthy();
    });

    it('Should render with minimum of data and start date', () => {
      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        startDate: '2020-10-10',
        status: 1,
        type: 1,
      });
      component.book = book;

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('.book-line__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__name').innerText).toContain(book.name);

      expect(element.querySelector<HTMLDivElement>('.book-line__authors').attributes.getNamedItem('hidden')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data').attributes.getNamedItem('hidden')).toBeFalsy();
      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data app-date-range').innerText).toContain('10/10/20');

      expect(component).toBeTruthy();
    });

    it('Should render with minimum of data and end date', () => {
      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        startDate: '2020-10-11',
        status: 1,
        type: 1,
      });
      component.book = book;

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('.book-line__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__name').innerText).toContain(book.name);

      expect(element.querySelector<HTMLDivElement>('.book-line__authors').attributes.getNamedItem('hidden')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data').attributes.getNamedItem('hidden')).toBeFalsy();
      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data app-date-range').innerText).toContain('10/11/20');

      expect(component).toBeTruthy();
    });

    it('Should render with full filled data', () => {
      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        startDate: '2020-10-10',
        endDate: '2020-10-11',
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


      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data app-date-range')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data app-date-range').innerText).toContain('10/10/20');
      expect(element.querySelector<HTMLDivElement>('.book-line__progress-data app-date-range').innerText).toContain('10/11/20');

      expect(component).toBeTruthy();
    });
  });
});
