import { TestBed } from '@angular/core/testing';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { DoneBooksResolver } from './done-books.resolver';

describe('DoneBooksResolver', () => {
  let resolver: DoneBooksResolver;
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
    resolver = TestBed.inject(DoneBooksResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', () => {
    const books = resolver.resolve();

    expect(spy).toHaveBeenCalledWith(BookStatus.Done);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
