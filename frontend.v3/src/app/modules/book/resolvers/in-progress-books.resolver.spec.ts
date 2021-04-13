import { TestBed } from '@angular/core/testing';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { InProgressBooksResolver } from './in-progress-books.resolver';

describe('InProgressBooksResolver', () => {
  let resolver: InProgressBooksResolver;
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
    resolver = TestBed.inject(InProgressBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', () => {
    const books = resolver.resolve();

    expect(spy).toHaveBeenCalledWith(BookStatus.InProgress);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
