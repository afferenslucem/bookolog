import { BookStartDateFormatValidator } from './book-start-date-format-validator';
import { Book } from '../../models/book';

describe('BookStartDateFormatValidator', () => {
  it('should create an instance', () => {
    expect(new BookStartDateFormatValidator()).toBeTruthy();
  });

  it('should pass empty date', () => {
    const book = {
      started: {},
    } as Book;

    const result = new BookStartDateFormatValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass correct date', () => {
    const book = {
      started: {
        year: 2020,
        month: 6,
        day: 12,
      },
    } as Book;

    const result = new BookStartDateFormatValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should return error', () => {
    const book = {
      started: {
        year: 2020,
        month: 16,
        day: 12,
      },
    } as Book;

    const result = new BookStartDateFormatValidator().validate(book);

    expect(result).toEqual({
      error: 'DateFormatError',
      args: 'MonthTooBig',
    });
  });
});
