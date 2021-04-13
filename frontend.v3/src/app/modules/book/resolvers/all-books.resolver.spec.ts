import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { AllBooksResolver } from './all-books.resolver';

describe('AllBooksResolver', () => {
  let resolver: AllBooksResolver;
  const spy: jasmine.Spy<jasmine.Func> = jasmine.createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {
            getAll: spy,
          },
        },
      ],
    });
    resolver = TestBed.inject(AllBooksResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should requests ToRead', async () => {
    const books = await resolver.resolve();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
