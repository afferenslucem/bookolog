import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';
import { Book } from '../../../book/models/book';
import { YearStatisticComponent } from './year-statistic.component';
import { BookStatus } from '../../../book/models/book-status';

describe('YearStatisticComponent', () => {
  let component: YearStatisticComponent;
  let fixture: ComponentFixture<YearStatisticComponent>;
  let books: Book[] = [
    new Book({
      endDateYear: 2020,
      name: 'name0',
      modifyDate: '2021-01-01',
      status: BookStatus.Done,
    } as any),
    new Book({
      endDateYear: 2020,
      name: 'name1',
      modifyDate: '2021-01-02',
      status: BookStatus.Done,
    } as any),
    new Book({
      endDateYear: 2020,
      status: BookStatus.Done,
      name: 'name2'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      name: 'name3'
    } as any),
    new Book({
      endDateYear: 2020,
      status: BookStatus.Done,
      endDateMonth: 10,
      endDateDay: 22,
      name: 'name4'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      endDateDay: 23,
      status: BookStatus.Done,
      name: 'name5'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 11,
      endDateDay: 23,
      status: BookStatus.Done,
      name: 'name6'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 11,
      endDateDay: 23,
      name: 'name6.1',
      modifyDate: '2021-01-03',
      status: BookStatus.Done,
      createDate: '2021-01-02',
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 11,
      endDateDay: 23,
      name: 'name6.2',
      createDate: '2021-01-03',
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 11,
      endDateDay: 22,
      status: BookStatus.Done,
      name: 'name7'
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ YearStatisticComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: of({ books }),
            params: of({ filter: '2020' }),
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearStatisticComponent);
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

      expect(sorted.map(item => item.name)).toEqual(['name6.1', 'name6', 'name7', 'name5', 'name4', 'name1', 'name0', 'name2']);
    });
  });

  describe('title', () => {
    it('Should set custom', async () => {
      const title = TestBed.inject(TitleService);

      await component.filter$.toPromise();

      expect(title.custom).toEqual('2020');
    });
  });
});
