import { TestBed } from '@angular/core/testing';

import { ProgressAlgorithmService } from './progress-algorithm.service';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';

describe('ProgressAlgorithmService', () => {
  let service: ProgressAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('oneOfProgressType', () => {
    expect(service.oneOfProgressType(ProgressAlgorithmType.Left)).toBeTrue();
    expect(service.oneOfProgressType(ProgressAlgorithmType.Done)).toBeTrue();
    expect(service.oneOfProgressType('')).toBeFalse();
  });
});
