import { ProgressAlgorithmSolver } from './progress-algorithm-solver';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';

describe('ProgressAlgorithmSolver', () => {
  it('should create an instance', () => {
    expect(new ProgressAlgorithmSolver()).toBeTruthy();
  });

  it('oneOfProgressType', () => {
    expect(ProgressAlgorithmSolver.oneOfProgressType(ProgressAlgorithmType.Left)).toBeTrue();
    expect(ProgressAlgorithmSolver.oneOfProgressType(ProgressAlgorithmType.Done)).toBeTrue();
    expect(ProgressAlgorithmSolver.oneOfProgressType('')).toBeFalse();
  });
});
