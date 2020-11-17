import { TestBed } from '@angular/core/testing';
import { InProgressBooksResolver } from './in-progress-books.resolver';

describe('InProgressBooksResolver', () => {
  let resolver: InProgressBooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InProgressBooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
