import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { InProgressBooksListComponent } from './in-progress-books-list.component';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';

describe('InProgressBooksListComponent', () => {
  let component: InProgressBooksListComponent;
  let fixture: ComponentFixture<InProgressBooksListComponent>;
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
      name: 'name2',
      createDate: '2021-01-02',
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      createDate: '2021-01-03',
      name: 'name3'
    } as any),
    new Book({
      endDateYear: 2020,
      endDateMonth: 10,
      endDateDay: 22,
      createDate: '2021-01-03',
      modifyDate: '2021-01-04',
      name: 'name4'
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ InProgressBooksListComponent ],
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
    fixture = TestBed.createComponent(InProgressBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const title = TestBed.inject(TitleService);

    expect(title.title).toEqual(TitleText.InProgressList);
  });

  describe('Books sorting', () => {
    it('Should order years descending', async () => {
      const sorted = await component.books$.pipe(
        first()
      ).toPromise();

      expect(sorted.map(item => item.name)).toEqual(['name4', 'name1', 'name0', 'name3', 'name2']);
    });
  });
});
