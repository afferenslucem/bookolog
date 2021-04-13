import { TestBed } from '@angular/core/testing';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { ToReadBooksResolver } from './to-read-books.resolver';

describe('ToReadBooksResolver', () => {
  let resolver: ToReadBooksResolver;
  const spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

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
    resolver = TestBed.inject(ToReadBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', () => {
    const books = resolver.resolve();

    expect(spy).toHaveBeenCalledWith(BookStatus.ToRead);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
