import { TestBed } from '@angular/core/testing';
import { BookService } from '../services/book.service';
import { DoneBooksResolver } from './done-books.resolver';

describe('DoneBooksResolver', () => {
  let resolver: DoneBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: {}
        }
      ]
    });
    resolver = TestBed.inject(DoneBooksResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });
});
