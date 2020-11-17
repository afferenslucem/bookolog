import { TestBed } from '@angular/core/testing';

import { BookOriginService } from './book.origin.service';

describe('Book.OriginService', () => {
  let service: BookOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
