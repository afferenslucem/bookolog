import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { ToReadBooksResolver } from './to-read-books.resolver';

describe('ToReadBooksResolver', () => {
  let resolver: ToReadBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {}
        }
      ]
    });
    resolver = TestBed.inject(ToReadBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
