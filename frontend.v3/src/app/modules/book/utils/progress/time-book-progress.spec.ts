import { TimeBookProgress } from './time-book-progress';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

describe('TimeBookProgress', () => {
  it('should create an instance', () => {
    expect(new TimeBookProgress()).toBeTruthy();
  });

  describe('Done progress', () => {
    describe('done', () => {
      it('done should return 130', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.done;
        const expected = {
          hours: 2,
          minutes: 10,
        };

        expect(result).toEqual(expected);
      });

      it('doneNumeric should return 130', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.doneNumeric;
        const expected = 130;

        expect(result).toEqual(expected);
      });

      it('doneUnits should return 130', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.doneUnits;
        const expected = 130;

        expect(result).toEqual(expected);
      });
    });

    describe('total', () => {
      it('total should return 1000', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.total;
        const expected = {
          hours: 16,
          minutes: 40,
        };

        expect(result).toEqual(expected);
      });

      it('totalNumeric should return 1000', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.totalNumeric;
        const expected = 1000;

        expect(result).toEqual(expected);
      });

      it('totalUnits should return 130', () => {
        const progress = new TimeBookProgress();

        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.totalUnits;
        const expected = 1000;

        expect(result).toEqual(expected);
      });
    });

    it('progressPercent should return 13', () => {
      const progress = new TimeBookProgress();

      progress.total = {
        hours: 16,
        minutes: 40,
      };
      progress.done = {
        hours: 2,
        minutes: 10,
      };

      const result = progress.progressPercent;
      const expected = 13;

      expect(result).toEqual(expected);
    });

    it('progressType should return Done', () => {
      const progress = new TimeBookProgress();

      const result = progress.progressType;
      const expected = ProgressAlgorithmType.Done;

      expect(result).toEqual(expected);
    });
  });

  describe('Left progress', () => {
    describe('done', () => {
      it('done should return 870', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.done;
        const expected = {
          hours: 2,
          minutes: 10,
        };

        expect(result).toEqual(expected);
      });

      it('doneNumeric should return 870', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.doneNumeric;
        const expected = 870;

        expect(result).toEqual(expected);
      });

      it('doneUnits should return 130', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.doneUnits;
        const expected = 130;

        expect(result).toEqual(expected);
      });
    });

    describe('total', () => {
      it('total should return 1000', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.total;
        const expected = {
          hours: 16,
          minutes: 40,
        };

        expect(result).toEqual(expected);
      });

      it('totalNumeric should return 1000', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.totalNumeric;
        const expected = 1000;

        expect(result).toEqual(expected);
      });

      it('totalUnits should return 1000', () => {
        const progress = new TimeBookProgress();

        progress.progressType = ProgressAlgorithmType.Left;
        progress.total = {
          hours: 16,
          minutes: 40,
        };
        progress.done = {
          hours: 2,
          minutes: 10,
        };

        const result = progress.totalUnits;
        const expected = 1000;

        expect(result).toEqual(expected);
      });
    });

    it('progressPercent should return 13', () => {
      const progress = new TimeBookProgress();

      progress.progressType = ProgressAlgorithmType.Left;
      progress.total = {
        hours: 16,
        minutes: 40,
      };
      progress.done = {
        hours: 2,
        minutes: 10,
      };

      const result = progress.progressPercent;
      const expected = 87;

      expect(result).toEqual(expected);
    });

    it('progressType should return Left', () => {
      const progress = new TimeBookProgress();

      progress.progressType = ProgressAlgorithmType.Left;
      const result = progress.progressType;
      const expected = ProgressAlgorithmType.Left;

      expect(result).toEqual(expected);
    });
  });
});
