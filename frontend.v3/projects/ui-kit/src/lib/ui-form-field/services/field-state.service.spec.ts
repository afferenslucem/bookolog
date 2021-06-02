import { TestBed } from '@angular/core/testing';

import { FieldStateService } from './field-state.service';

describe('FieldStateService', () => {
  let service: FieldStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
