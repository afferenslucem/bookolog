import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BookOriginService } from './book.origin.service';

describe('BookOriginService', () => {
  let service: BookOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BookOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
