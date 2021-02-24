import { TestBed } from '@angular/core/testing';
import { BookSyncResolver } from './book-sync.resolver';
import { SyncService } from '../../../main/services/sync.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';

describe('BookSyncResolver', () => {
  let resolver: BookSyncResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UUIDGeneratorService, useValue: {} },
      ]
    });
    resolver = TestBed.inject(BookSyncResolver);
  });

  it('should create an instance', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should return true', async () => {
      const syncer = TestBed.inject(SyncService);

      const spy = spyOn(syncer, 'sync').and.resolveTo();

      const result = await resolver.resolve(null, null);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBeTrue();
    });

    it('should return false', async () => {
      const syncer = TestBed.inject(SyncService);

      const spy = spyOn(syncer, 'sync').and.rejectWith();

      const result = await resolver.resolve(null, null);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBeFalse();
    });
  });
});
