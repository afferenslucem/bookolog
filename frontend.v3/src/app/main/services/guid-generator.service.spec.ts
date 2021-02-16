import { TestBed } from '@angular/core/testing';

import { UUIDGeneratorService } from './u-u-i-d-generator.service';

describe('GuidGeneratorService', () => {
  let service: UUIDGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UUIDGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
