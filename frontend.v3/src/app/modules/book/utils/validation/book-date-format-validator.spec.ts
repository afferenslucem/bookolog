import { BookDateFormatValidator } from './book-date-format-validator';
import { BookDate } from '../../models/book-date';
import { DateUtils } from '../../../../main/utils/date-utils';

describe('BookDateFormatValidator', () => {
  describe('Format validation', () => {
    describe('Fields structure checking', () => {
      it('should require month for filled day', () => {
        const date: BookDate = {
          year: 2021,
          day: 23,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual({
          error: 'DateFormatError',
          args: 'RequiresMonth',
        });
      });

      it('should require year for filled day', () => {
        const date: BookDate = {
          day: 23,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual({
          error: 'DateFormatError',
          args: 'RequiresYear',
        });
      });

      it('should require year for filled month', () => {
        const date: BookDate = {
          month: 5,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual({
          error: 'DateFormatError',
          args: 'RequiresYear',
        });
      });

      it('should pass filled date', () => {
        const date: BookDate = {
          year: 2021,
          month: 6,
          day: 23,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual(null);
      });

      it('should pass empty day', () => {
        const date: BookDate = {
          year: 2021,
          month: 6,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual(null);
      });

      it('should pass empty day and month', () => {
        const date: BookDate = {
          year: 2021,
        };

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual(null);
      });

      it('should pass empty obj', () => {
        const date: BookDate = {};

        const error = BookDateFormatValidator.validateDate(date);

        expect(error).toEqual(null);
      });
    });

    describe('Fields validation', () => {
      describe('Year', () => {
        it('should return min error', () => {
          const date: BookDate = {
            year: 1800,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'YearTooSmall',
          });
        });

        it('should return max error', () => {
          const date: BookDate = {
            year: DateUtils.today.year + 1,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'YearTooBig',
          });
        });

        it('should pass empty year', () => {
          const date: BookDate = {
            year: null,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });

        it('should pass current year', () => {
          const date: BookDate = {
            year: DateUtils.today.year,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });
      });

      describe('Month', () => {
        it('should return min error', () => {
          const date: BookDate = {
            year: 2020,
            month: 0,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'MonthTooSmall',
          });
        });

        it('should return max error', () => {
          const date: BookDate = {
            year: 2020,
            month: 13,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'MonthTooBig',
          });
        });

        it('should pass correct month', () => {
          const date: BookDate = {
            year: 2020,
            month: 6,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });

        it('should pass empty month', () => {
          const date: BookDate = {
            year: 2020,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });
      });

      describe('Day', () => {
        it('should return min error', () => {
          const date: BookDate = {
            year: 2020,
            month: 6,
            day: 0,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'DayTooSmall',
          });
        });

        it('should return max error', () => {
          const date: BookDate = {
            year: 2020,
            month: 6,
            day: 32,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual({
            error: 'DateFormatError',
            args: 'DayTooBig',
          });
        });

        it('should pass correct day', () => {
          const date: BookDate = {
            year: 2020,
            month: 6,
            day: 31,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });

        it('should pass empty day', () => {
          const date: BookDate = {
            year: 2020,
            month: 6,
          };

          const error = BookDateFormatValidator.validateDate(date);

          expect(error).toEqual(null);
        });
      });
    });
  });
});
