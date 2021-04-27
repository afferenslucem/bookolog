import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GenresListComponent } from './genres-list.component';

describe('GenresListComponent', () => {
  let component: GenresListComponent;
  let fixture: ComponentFixture<GenresListComponent>;
  let router: Router;

  const books: Book[] = [
    new Book({
      genre: 'One',
    } as any),
    new Book({
      genre: '',
    } as any),
    new Book({
      genre: 'two',
    } as any),
    new Book({
      genre: 'Two',
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [GenresListComponent],
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
    fixture = TestBed.createComponent(GenresListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run counts by genres in pipe', async () => {
    const spy = spyOn(component, 'countGenres');

    await component.genres$.toPromise();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should counts by genres', () => {
    const result = component.countGenres(books);

    const expected = [
      { key: 'two', group: 2 },
      { key: 'One', group: 1 },
    ] as any;

    expect(result).toEqual(expected);
  });

  it('should navigate to author', async () => {
    const spy = spyOn(router, 'navigate');

    await component.selectedGenre('ping');

    expect(spy).toHaveBeenCalledOnceWith(['/genre', 'ping']);
  });
});
