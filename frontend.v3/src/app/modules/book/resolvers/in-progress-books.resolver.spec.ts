import { TestBed } from '@angular/core/testing';
import { BookOriginService } from '../services/book.origin.service';
import { InProgressBooksResolver } from './in-progress-books.resolver';

describe('InProgressBooksResolver', () => {
  let resolver: BookOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InProgressBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
