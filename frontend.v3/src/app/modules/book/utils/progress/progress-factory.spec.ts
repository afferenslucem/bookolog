import { ProgressFactory } from './progress-factory';
import { BookType } from '../../models/book-type';
import { PageBookProgress } from './page-book-progress';
import { TimeBookProgress } from './time-book-progress';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

describe('ProgressFactory', () => {
  describe('getProgress', () => {
    it('should return PageProgress for Electronic type', () => {
      const result = ProgressFactory.getProgress(BookType.Electronic);

      expect(result).toBeInstanceOf(PageBookProgress);
      expect(result.progressType).toBe(ProgressAlgorithmType.Done);
    });

    it('should return PageProgress for Paper type', () => {
      const result = ProgressFactory.getProgress(BookType.Paper);

      expect(result).toBeInstanceOf(PageBookProgress);
      expect(result.progressType).toBe(ProgressAlgorithmType.Done);
    });

    it('should return PageProgress with Left progress type for Paper type', () => {
      const result = ProgressFactory.getProgress(BookType.Paper, ProgressAlgorithmType.Left);

      expect(result).toBeInstanceOf(PageBookProgress);
      expect(result.progressType).toBe(ProgressAlgorithmType.Left);
    });

    it('should return PageProgress for Paper type', () => {
      const result = ProgressFactory.getProgress(BookType.Audio);

      expect(result).toBeInstanceOf(TimeBookProgress);
      expect(result.progressType).toBe(ProgressAlgorithmType.Done);
    });
  });

  describe('getProgressFromBook', () => {
    it('should return Time left progress', () => {
      const result = ProgressFactory.getProgressFromBook({
        doneUnits: 100,
        totalUnits: 300,
        progressType: ProgressAlgorithmType.Left,
        type: BookType.Audio,
      } as any);

      expect(result).toBeInstanceOf(TimeBookProgress);
      expect(result.doneNumeric).toBe(200);
      expect(result.totalNumeric).toBe(300);
      expect(result.progressType).toBe(ProgressAlgorithmType.Left);
    });

    it('should return Page done progress', () => {
      const result = ProgressFactory.getProgressFromBook({
        doneUnits: 100,
        totalUnits: 300,
        progressType: ProgressAlgorithmType.Done,
        type: '0',
      } as any);

      expect(result).toBeInstanceOf(PageBookProgress);
      expect(result.doneNumeric).toBe(100);
      expect(result.totalNumeric).toBe(300);
      expect(result.progressType).toBe(ProgressAlgorithmType.Done);
    });
  });
});
