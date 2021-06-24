import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';
import { BookDate } from '../../models/book-date';
import { DateUtils } from '../../../../main/utils/date-utils';

export abstract class BookDateFormatValidator extends SingleEntityValidator<Book> {
  public static validateDate(bookDate: BookDate): EntityValidationResult | null {
    const structureError = BookDateFormatValidator.validateStructure(bookDate);

    if (structureError) {
      return structureError;
    }

    return BookDateFormatValidator.validateFormat(bookDate);
  }

  public static validateStructure(bookDate: BookDate): EntityValidationResult | null {
    if (bookDate.day != null && bookDate.year == null) {
      return { error: 'DateFormatError', args: 'RequiresYear' };
    } else if (bookDate.day != null && bookDate.month == null) {
      return { error: 'DateFormatError', args: 'RequiresMonth' };
    } else if (bookDate.month != null && bookDate.year == null) {
      return { error: 'DateFormatError', args: 'RequiresYear' };
    } else {
      return null;
    }
  }

  public static validateFormat(bookDate: BookDate): EntityValidationResult | null {
    return this.validateYear(bookDate.year) || this.validateMonth(bookDate.month) || this.validateDay(bookDate.day);
  }

  public static validateYear(year: number): EntityValidationResult | null {
    if (year == null) {
      return null;
    } else if (year < 1900) {
      return {
        error: 'DateFormatError',
        args: 'YearTooSmall',
      };
    } else if (year > DateUtils.today.year) {
      return {
        error: 'DateFormatError',
        args: 'YearTooBig',
      };
    } else {
      return null;
    }
  }

  public static validateMonth(month: number): EntityValidationResult | null {
    if (month == null) {
      return null;
    } else if (month < 1) {
      return {
        error: 'DateFormatError',
        args: 'MonthTooSmall',
      };
    } else if (month > 12) {
      return {
        error: 'DateFormatError',
        args: 'MonthTooBig',
      };
    } else {
      return null;
    }
  }

  public static validateDay(day: number): EntityValidationResult | null {
    if (day == null) {
      return null;
    } else if (day < 1) {
      return {
        error: 'DateFormatError',
        args: 'DayTooSmall',
      };
    } else if (day > 31) {
      return {
        error: 'DateFormatError',
        args: 'DayTooBig',
      };
    } else {
      return null;
    }
  }
}
