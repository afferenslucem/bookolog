import { TestBed } from '@angular/core/testing';
import { SyncResolver } from './sync-resolver.service';

describe('BookSyncResolver', () => {
  let resolver: SyncResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SyncResolver,
          useValue: {},
        },
      ],
    });
    resolver = TestBed.inject(SyncResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });
});
