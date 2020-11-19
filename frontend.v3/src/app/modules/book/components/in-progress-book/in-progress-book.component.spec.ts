import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookPagesProgressComponent } from '../book-pages-progress/book-pages-progress.component';
import { BookTimeProgressComponent } from '../book-time-progress/book-time-progress.component';
import { DateRangeComponent } from '../date-range/date-range.component';

import { InProgressBookComponent } from './in-progress-book.component';

describe('InProgressBookComponent', () => {
  let component: InProgressBookComponent;
  let fixture: ComponentFixture<InProgressBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InProgressBookComponent,
        BookTimeProgressComponent,
        BookPagesProgressComponent,
        DateRangeComponent
      ],
      imports: [
        FormattingModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDividerModule,
      ]
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

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(InProgressBookComponent);
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

      expect(element.querySelector<HTMLDivElement>('.book__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__name').innerText).toEqual(book.name);

      expect(element.querySelector<HTMLDivElement>('.book__authors')).toBeFalsy();

      expect(element.querySelector<HTMLElement>('mat-progress-bar').getAttribute('aria-valuenow')).toEqual('0');

      expect(element.querySelector<HTMLDivElement>('.book__progress-data')).toBeFalsy();

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

      expect(element.querySelector<HTMLDivElement>('.book__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__name').innerText).toEqual(book.name);

      expect(element.querySelector<HTMLDivElement>('.book__authors')).toBeFalsy();

      expect(element.querySelector<HTMLElement>('mat-progress-bar').getAttribute('aria-valuenow')).toEqual('0');

      expect(element.querySelector<HTMLDivElement>('.book__progress-data app-date-range')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__progress-data app-date-range').innerText).toContain('10/10/20');

      expect(component).toBeTruthy();
    });

    it('Should render with minimum of data and start date', () => {
      const book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        doneUnits: 50,
        totalUnits: 100,
        status: 1,
        type: 1,
      });
      component.book = book;

      fixture.detectChanges();

      expect(element.querySelector<HTMLDivElement>('.book__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__name').innerText).toEqual(book.name);

      expect(element.querySelector<HTMLDivElement>('.book__authors')).toBeFalsy();

      expect(element.querySelector<HTMLElement>('mat-progress-bar').getAttribute('aria-valuenow')).toEqual('50');

      expect(element.querySelector<HTMLDivElement>('.book__progress-data')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book__progress-data .progress').innerText).toContain('50');
      expect(element.querySelector<HTMLDivElement>('.book__progress-data .progress').innerText).toContain('100');

      expect(component).toBeTruthy();
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

      expect(element.querySelector<HTMLDivElement>('.book__name')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__name').innerText).toEqual(book.name);

      expect(element.querySelector<HTMLDivElement>('.book__authors')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__authors').innerText).toContain('author1');
      expect(element.querySelector<HTMLDivElement>('.book__authors').innerText).toContain('author2');

      expect(element.querySelector<HTMLElement>('mat-progress-bar').getAttribute('aria-valuenow')).toEqual('50');

      expect(element.querySelector<HTMLDivElement>('.book__progress-data')).toBeTruthy();

      expect(element.querySelector<HTMLDivElement>('.book__progress-data .progress').innerText).toContain('00:50');
      expect(element.querySelector<HTMLDivElement>('.book__progress-data .progress').innerText).toContain('01:40');

      expect(element.querySelector<HTMLDivElement>('.book__progress-data app-date-range')).toBeTruthy();
      expect(element.querySelector<HTMLDivElement>('.book__progress-data app-date-range').innerText).toContain('10/10/20');

      expect(component).toBeTruthy();
    });
  });
});
