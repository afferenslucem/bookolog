import { BookStartDateGreaterOrEqualThenFinishDateValidator } from './book-start-date-greater-or-equal-then-finish-date-validator';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';

describe('BookStartDateGreaterOrEqualThenFinishDateValidator', () => {
  it('should create an instance', () => {
    expect(new BookStartDateGreaterOrEqualThenFinishDateValidator()).toBeTruthy();
  });

  it('should pass non done book', () => {
    const book = {
      status: BookStatus.InProgress,
      started: {
        year: 2020,
        month: 8,
        day: 22,
      },
      finished: {
        year: 2020,
        month: 7,
        day: 22,
      },
    } as Book;

    const result = new BookStartDateGreaterOrEqualThenFinishDateValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book without start', () => {
    const book = {
      status: BookStatus.Done,
      finished: {
        year: 2020,
        month: 7,
        day: 22,
      },
    } as Book;

    const result = new BookStartDateGreaterOrEqualThenFinishDateValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book without finish date', () => {
    const book = {
      status: BookStatus.Done,
      started: {
        year: 2020,
        month: 8,
        day: 22,
      },
    } as Book;

    const result = new BookStartDateGreaterOrEqualThenFinishDateValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book with correct dates', () => {
    const book = {
      status: BookStatus.Done,
      started: {
        year: 2020,
        month: 8,
        day: 22,
      },
      finished: {
        year: 2020,
        month: 9,
        day: 22,
      },
    } as Book;

    const result = new BookStartDateGreaterOrEqualThenFinishDateValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should return error', () => {
    const book = {
      status: BookStatus.Done,
      started: {
        year: 2020,
        month: 9,
        day: 22,
      },
      finished: {
        year: 2020,
        month: 8,
        day: 21,
      },
    } as Book;

    const result = new BookStartDateGreaterOrEqualThenFinishDateValidator().validate(book);

    expect(result).toEqual({
      error: 'StartedDateGreaterThenFinished',
    });
  });
});
