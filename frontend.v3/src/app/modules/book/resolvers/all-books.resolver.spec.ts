import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { AllBooksResolver } from './all-books.resolver';

describe('AllBooksResolver', () => {
  let resolver: AllBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {}
        }
      ]
    });
    resolver = TestBed.inject(AllBooksResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });
});
