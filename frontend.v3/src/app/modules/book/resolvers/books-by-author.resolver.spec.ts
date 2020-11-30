import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { BooksByAuthorResolver } from './books-by-author.resolver';

describe('BooksByAuthorResolver', () => {
  let resolver: BooksByAuthorResolver;

  const booksValue: Book[] = [{
    authors: ['author1'],
  }, {
    authors: ['author1', 'author2'],
  }, {
    authors: ['author2'],
  }] as any;

  let spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy().and.resolveTo(booksValue);

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
    resolver = TestBed.inject(BooksByAuthorResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', async () => {
    const authorSpy = jasmine.createSpy().and.returnValue('author1');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: authorSpy,
      },
    } as any;

    const books = await resolver.resolve(route, null);

    expect(spy).toHaveBeenCalledWith(BookStatus.Done);
    expect(spy).toHaveBeenCalledTimes(1);

    expect(authorSpy).toHaveBeenCalledWith('filter');
    expect(authorSpy).toHaveBeenCalledTimes(1);

    expect(books).toEqual([{
      authors: ['author1'],
    }, {
      authors: ['author1', 'author2'],
    }] as any);
  });
});
