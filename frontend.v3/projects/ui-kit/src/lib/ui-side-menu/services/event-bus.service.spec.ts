import { TestBed } from '@angular/core/testing';

import { EventBusService } from './event-bus.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('EventBusService', () => {
  let service: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(EventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
