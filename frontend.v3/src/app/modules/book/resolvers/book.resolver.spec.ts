import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { BookResolver } from './book.resolver';

describe('BookResolver', () => {
  let resolver: BookResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {}
        }
      ]
    });
    resolver = TestBed.inject(BookResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });
});
