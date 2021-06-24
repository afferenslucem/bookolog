import { Book } from '../../models/book';
import { BookFinishedDateFormatValidator } from './book-finished-date-format-validator';

describe('BookFinishedDateFormatValidator', () => {
  it('should create an instance', () => {
    expect(new BookFinishedDateFormatValidator()).toBeTruthy();
  });

  it('should pass empty date', () => {
    const book = {
      finished: {},
    } as Book;

    const result = new BookFinishedDateFormatValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass correct date', () => {
    const book = {
      finished: {
        year: 2020,
        month: 1,
        day: 12,
      },
    } as Book;

    const result = new BookFinishedDateFormatValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should return error', () => {
    const book = {
      finished: {
        year: 2020,
        month: 0,
        day: 12,
      },
    } as Book;

    const result = new BookFinishedDateFormatValidator().validate(book);

    expect(result).toEqual({
      error: 'DateFormatError',
      args: 'MonthTooSmall',
    });
  });
});
