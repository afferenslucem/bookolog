import { TestBed } from '@angular/core/testing';

import { BookActionService } from './book-action.service';

describe('BookActionService', () => {
  let service: BookActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
