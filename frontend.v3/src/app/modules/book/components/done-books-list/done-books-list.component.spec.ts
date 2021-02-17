import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../models/book';
import { DoneBooksListComponent } from './done-books-list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

describe('DoneBooksListComponent', () => {
  let component: DoneBooksListComponent;
  let fixture: ComponentFixture<DoneBooksListComponent>;
  let books: Book[] = [
    new Book({
      name: 'name0',
      modifyDate: '2021-01-01',
    } as any),
    new Book({
      name: 'name1',
      modifyDate: '2021-01-02',
    } as any),
    new Book({
      endDateYear: 2020,
      name: 'name2'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      name: 'name3'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      endDateDay: 22,
      name: 'name4'
    } as any),
    new Book({
      endDateYear: 2021,
      endDateMonth: 10,
      endDateDay: 23,
      name: 'name5'
    } as any),
    new Book({
      endDateYear: 2021,
      endDateMonth: 11,
      endDateDay: 23,
      name: 'name6'
    } as any),
    new Book({
      endDateYear: 2021,
      endDateMonth: 11,
      endDateDay: 23,
      name: 'name6.1',
      modifyDate: '2021-01-03',
      createDate: '2021-01-02',
    } as any),
    new Book({
      endDateYear: 2021,
      endDateMonth: 11,
      endDateDay: 23,
      name: 'name6.2',
      createDate: '2021-01-03',
    } as any),
    new Book({
      endDateYear: 2021,
      endDateMonth: 11,
      endDateDay: 22,
      name: 'name7'
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ DoneBooksListComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: of({ books })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Books sorting', () => {
    it('Should order years descending', async () => {
      const sorted = await component.books$.pipe(
        first()
      ).toPromise();

      expect(sorted.map(item => item.name)).toEqual(['name6.1', 'name6.2', 'name6', 'name7', 'name5', 'name4', 'name3', 'name2', 'name1', 'name0']);
    });
  });
});
