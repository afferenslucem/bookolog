import { PageBookProgress } from './page-book-progress';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

describe('PageBookProgress', () => {
  it('should create an instance', () => {
    expect(new PageBookProgress()).toBeTruthy();
  });

  describe('Done progress', () => {
    describe('done', () => {
      it('done should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.done;
        const expected = 13;

        expect(result).toEqual(expected);
      });

      it('doneNumeric should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.doneNumeric;
        const expected = 13;

        expect(result).toEqual(expected);
      });

      it('doneUnits should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.doneUnits;
        const expected = 13;

        expect(result).toEqual(expected);
      });
    });

    describe('total', () => {
      it('total should return 100', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.total;
        const expected = 100;

        expect(result).toEqual(expected);
      });

      it('totalNumeric should return 100', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.totalNumeric;
        const expected = 100;

        expect(result).toEqual(expected);
      });

      it('totalUnits should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.totalUnits;
        const expected = 100;

        expect(result).toEqual(expected);
      });
    });

    it('progressPercent should return 13', () => {
      const progress = new PageBookProgress();

      progress.total = 100;
      progress.done = 13;

      const result = progress.progressPercent;
      const expected = 13;

      expect(result).toEqual(expected);
    });

    it('progressType should return Done', () => {
      const progress = new PageBookProgress();

      const result = progress.progressType;
      const expected = ProgressAlgorithmType.Done;

      expect(result).toEqual(expected);
    });
  });

  describe('Left progress', () => {
    describe('done', () => {
      it('done should return 13', () => {
        const progress = new PageBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = 100;
        progress.done = 13;

        const result = progress.done;
        const expected = 13;

        expect(result).toEqual(expected);
      });

      it('doneNumeric should return 87', () => {
        const progress = new PageBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = 100;
        progress.done = 13;

        const result = progress.doneNumeric;
        const expected = 87;

        expect(result).toEqual(expected);
      });

      it('doneUnits should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.doneUnits;
        const expected = 13;

        expect(result).toEqual(expected);
      });
    });

    describe('total', () => {
      it('total should return 100', () => {
        const progress = new PageBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = 100;
        progress.done = 13;

        const result = progress.total;
        const expected = 100;

        expect(result).toEqual(expected);
      });

      it('totalNumeric should return 100', () => {
        const progress = new PageBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = 100;
        progress.done = 13;

        const result = progress.totalNumeric;
        const expected = 100;

        expect(result).toEqual(expected);
      });

      it('totalUnits should return 13', () => {
        const progress = new PageBookProgress();

        progress.total = 100;
        progress.done = 13;

        const result = progress.totalUnits;
        const expected = 100;

        expect(result).toEqual(expected);
      });
    });

    it('progressPercent should return 87', () => {
      const progress = new PageBookProgress();

      progress.progressType = ProgressAlgorithmType.Left;
      progress.total = 100;
      progress.done = 13;

      const result = progress.progressPercent;
      const expected = 87;

      expect(result).toEqual(expected);
    });

    it('progressType should return Left', () => {
      const progress = new PageBookProgress();

      progress.progressType = ProgressAlgorithmType.Left;
      const result = progress.progressType;
      const expected = ProgressAlgorithmType.Left;

      expect(result).toEqual(expected);
    });
  });
});
