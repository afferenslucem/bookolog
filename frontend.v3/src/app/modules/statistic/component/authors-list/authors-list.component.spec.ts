import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { AuthorsListComponent } from './authors-list.component';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';

describe('AuthorsListComponent', () => {
  let component: AuthorsListComponent;
  let fixture: ComponentFixture<AuthorsListComponent>;
  let titleService: TitleService;
  let router: Router;

  const books: Book[] = [
    new Book({
      authors: ['One', 'two'],
    } as any),
    new Book({
      authors: [],
    } as any),
    new Book({
      authors: ['two'],
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [AuthorsListComponent],
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
    fixture = TestBed.createComponent(AuthorsListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    titleService = TestBed.inject(TitleService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run counts by author in pipe', async () => {
    const spy = spyOn(component, 'countAuthors');

    await component.authors$.toPromise();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should counts by author', () => {
    const result = component.countAuthors(books);

    const expected = [
      { key: 'two', group: 2 },
      { key: 'One', group: 1 },
    ] as any;

    expect(result).toEqual(expected);
  });

  it('should navigate to author', async () => {
    const spy = spyOn(router, 'navigate');

    await component.selectedAuthor('ping');

    expect(spy).toHaveBeenCalledOnceWith(['/author', 'ping']);
  });

  it('should set title', () => {
    expect(titleService.title).toEqual(TitleText.AuthorsStatistic);
  });
});
