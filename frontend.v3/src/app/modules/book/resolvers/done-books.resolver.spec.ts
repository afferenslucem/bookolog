import { TestBed } from '@angular/core/testing';
import { BookStatus } from '../models/book-status';
import { BookService } from '../services/book.service';
import { DoneBooksResolver } from './done-books.resolver';

describe('DoneBooksResolver', () => {
  let resolver: DoneBooksResolver;
  let spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getByStatus: spy,
          }
        }
      ]
    });
    resolver = TestBed.inject(DoneBooksResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', () => {
    const books = resolver.resolve(null, null);

    expect(spy).toHaveBeenCalledWith(BookStatus.Done);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
