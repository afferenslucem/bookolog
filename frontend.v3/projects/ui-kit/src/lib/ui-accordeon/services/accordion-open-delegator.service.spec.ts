import { TestBed } from '@angular/core/testing';

import { OpenDelegatorService } from './open-delegator.service';

describe('AccordionOpenDelegatorService', () => {
  let service: OpenDelegatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDelegatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
