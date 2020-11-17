import { TestBed } from '@angular/core/testing';
import { SyncService } from '../../../main/services/sync.service';
import { BookOriginService } from './book.origin.service';

import { BookService } from './book.service';
import { BookStorageService } from './book.storage.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookOriginService,
          useValue: {}
        },
        {
          provide: BookStorageService,
          useValue: {}
        },
        {
          provide: SyncService,
          useValue: {}
        },
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
