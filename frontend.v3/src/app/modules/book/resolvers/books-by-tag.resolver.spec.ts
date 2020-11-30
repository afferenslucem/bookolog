import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../models/book';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { BooksByTagResolver } from './books-by-tag.resolver';

describe('BooksByTagResolver', () => {
  let resolver: BooksByTagResolver;

  const booksValue: Book[] = [{
    tags: ['tag1'],
  }, {
    tags: ['tag1', 'tag2'],
  }, {
    tags: ['tag2'],
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
    resolver = TestBed.inject(BooksByTagResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', async () => {
    const tagSpy = jasmine.createSpy().and.returnValue('tag1');

    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: tagSpy,
      },
    } as any;

    const books = await resolver.resolve(route, null);

    expect(spy).toHaveBeenCalledWith(BookStatus.Done);
    expect(spy).toHaveBeenCalledTimes(1);

    expect(tagSpy).toHaveBeenCalledWith('filter');
    expect(tagSpy).toHaveBeenCalledTimes(1);

    expect(books).toEqual([{
      tags: ['tag1'],
    }, {
      tags: ['tag1', 'tag2'],
    }] as any);
  });
});
