import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { InProgressBooksResolver } from './in-progress-books.resolver';

describe('InProgressBooksResolver', () => {
  let resolver: InProgressBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {}
        }
      ]
    });
    resolver = TestBed.inject(InProgressBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
