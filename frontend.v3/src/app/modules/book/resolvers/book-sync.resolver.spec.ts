import { TestBed } from '@angular/core/testing';
import { BookSyncResolver } from './book-sync.resolver';

describe('BookSyncResolver', () => {
  let resolver: BookSyncResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookSyncResolver,
          useValue: {},
        },
      ],
    });
    resolver = TestBed.inject(BookSyncResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });
});
