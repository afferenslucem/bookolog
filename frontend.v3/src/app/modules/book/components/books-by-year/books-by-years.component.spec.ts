import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksByYearsComponent } from './books-by-years.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../models/book';

describe('DoneBooksStaticComponent', () => {
  let component: BooksByYearsComponent;
  let fixture: ComponentFixture<BooksByYearsComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BooksByYearsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksByYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Books grouping', () => {
    let books: Book[] = null;

    beforeEach(() => {
      books = [
        new Book({
          name: 'name0',
        } as any),
        new Book({
          name: 'name1',
        } as any),
        new Book({
          endDateYear: 2020,
          name: 'name2',
        } as any),
        new Book({
          endDateYear: 2020,
          endDateMonth: 10,
          name: 'name3',
        } as any),
        new Book({
          endDateYear: 2020,
          endDateMonth: 10,
          endDateDay: 22,
          name: 'name4',
        } as any),
        new Book({
          endDateYear: 2021,
          endDateMonth: 10,
          endDateDay: 23,
          name: 'name5',
        } as any),
        new Book({
          endDateYear: 2021,
          endDateMonth: 11,
          endDateDay: 23,
          name: 'name6',
        } as any),
        new Book({
          endDateYear: 2021,
          endDateMonth: 11,
          endDateDay: 22,
          name: 'name7',
        } as any),
      ];
    });

    it('Should order years descending', async () => {
      component.books = books;

      const sorted = await component.definedYears$;

      expect(sorted.map(item => item.key)).toEqual([2021, 2020]);
    });

    it('Should order books descending by end date', async () => {
      component.books = books;

      const sorted = await component.definedYears$;

      const year = sorted.find(item => item.key === 2021);

      expect(year.group.map(item => item.name)).toEqual(['name6', 'name7', 'name5']);
    });

    it('Should order books descending by date filling', async () => {
      component.books = books;

      const sorted = await component.definedYears$;

      const year = sorted.find(item => item.key === 2020);

      expect(year.group.map(item => item.name)).toEqual(['name4', 'name3', 'name2']);
    });

    it('Should fill books without date', async () => {
      component.books = books;

      const year = await component.undefinedYear$;

      expect(year.group.map(item => item.name)).toEqual(['name0', 'name1']);
    });
  });
});
