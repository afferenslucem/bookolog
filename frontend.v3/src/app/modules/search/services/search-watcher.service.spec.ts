import { TestBed } from '@angular/core/testing';

import { SearchWatcherService } from './search-watcher.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchWatcherService', () => {
  let service: SearchWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(SearchWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
