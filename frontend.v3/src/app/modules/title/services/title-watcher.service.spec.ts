import { TestBed } from '@angular/core/testing';

import { TitleWatcherService } from './title-watcher.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TitleWatcherService', () => {
  let service: TitleWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(TitleWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
