import { TestBed } from '@angular/core/testing';

import { EventBusService } from './event-bus.service';

describe('OpenDelegatorService', () => {
  let service: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
