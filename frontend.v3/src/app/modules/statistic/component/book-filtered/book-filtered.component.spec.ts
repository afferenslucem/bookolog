import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TitleService } from '../../../title/services/title.service';
import { BookFilteredComponent } from './book-filtered.component';
import { SearchService } from '../../../search/services/search.service';

describe('BookFilteredComponent', () => {
  let component: BookFilteredComponent;
  let fixture: ComponentFixture<BookFilteredComponent>;
  let titleService: TitleService;
  let searchService: SearchService;
  let router: Router;

  const books: Book[] = [
    new Book({
      guid: 'id',
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookFilteredComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              books,
            }),
            params: of({
              filter: 'test',
            }),
          },
        },
        SearchService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilteredComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    titleService = TestBed.inject(TitleService);
    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set filter as title', async () => {
    await component.filterParam$.toPromise();

    expect(titleService.custom).toEqual('test');
  });
});
