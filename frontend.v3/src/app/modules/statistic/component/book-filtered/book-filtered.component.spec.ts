import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TitleService } from '../../../ui/service/title.service';
import { TitleText } from '../../../ui/models/title-text';
import { BookFilteredComponent } from './book-filtered.component';

describe('BookFilteredComponent', () => {
  let component: BookFilteredComponent;
  let fixture: ComponentFixture<BookFilteredComponent>;
  let titleService: TitleService;
  let router: Router;

  let books: Book[] = [
    new Book({
      guid: 'id',
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookFilteredComponent],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: of({
              books,
            }),
            params: of({
              filter: 'test'
            })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilteredComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    titleService = TestBed.inject(TitleService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should catch books by pipe', async () => {
    const result = await component.books$.toPromise();

    const expected = [
      new Book({
        guid: 'id',
      } as any),
    ];

    expect(result).toEqual(expected);
  });

  it('should set filter as title', async () => {
    await component.filter$.toPromise();
    expect(titleService.custom).toEqual('test');
  });
});
