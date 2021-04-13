import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';
import { YearsListComponent } from './years-list.component';

describe('YearsListComponent', () => {
  let component: YearsListComponent;
  let fixture: ComponentFixture<YearsListComponent>;
  let titleService: TitleService;
  let router: Router;

  const books: Book[] = [
    new Book({
      endDateYear: 2020,
    } as any),
    new Book({} as any),
    new Book({
      endDateYear: 2021,
    } as any),
    new Book({
      endDateYear: 2021,
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [YearsListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              books,
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    titleService = TestBed.inject(TitleService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run counts by genres in pipe', async () => {
    const spy = spyOn(component, 'countYears');

    await component.years$.toPromise();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should counts by years', () => {
    const result = component.countYears(books);

    const expected = [
      { key: '2021', group: 2 },
      { key: '2020', group: 1 },
      { key: 'Не указан', group: 1 },
    ] as any;

    expect(result).toEqual(expected);
  });

  it('should navigate to author', async () => {
    const spy = spyOn(router, 'navigate');

    await component.selectedYear('ping');

    expect(spy).toHaveBeenCalledOnceWith(['/year', 'ping']);
  });

  it('should set title', () => {
    expect(titleService.title).toEqual(TitleText.YearsStatistic);
  });
});
