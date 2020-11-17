import { TestBed } from '@angular/core/testing';

import { BookStorageService } from './book.storage.service';

describe('BookStorageService', () => {
  let service: BookStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
