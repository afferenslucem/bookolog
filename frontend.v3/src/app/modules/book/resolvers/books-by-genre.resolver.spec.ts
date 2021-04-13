import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { BooksByGenreResolver } from './books-by-genre.resolver';

describe('BooksByGenreResolver', () => {
  let resolver: BooksByGenreResolver;

  const booksValue: Book[] = [
    {
      name: 'name1',
      genre: 'genre1',
    },
    {
      name: 'name2',
      genre: 'genre1',
    },
    {
      name: 'name3',
      genre: 'genre2',
    },
  ] as any;

  const spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy().and.resolveTo(booksValue);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getByStatus: spy,
          },
        },
      ],
    });
    resolver = TestBed.inject(BooksByGenreResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', async () => {
    const genreSpy = jasmine.createSpy().and.returnValue('genre1');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: genreSpy,
      },
    } as any;

    const books = await resolver.resolve(route);

    expect(spy).toHaveBeenCalledWith(BookStatus.Done);
    expect(spy).toHaveBeenCalledTimes(1);

    expect(genreSpy).toHaveBeenCalledWith('filter');
    expect(genreSpy).toHaveBeenCalledTimes(1);

    expect(books).toEqual([
      {
        name: 'name1',
        genre: 'genre1',
      },
      {
        name: 'name2',
        genre: 'genre1',
      },
    ] as any);
  });
});
