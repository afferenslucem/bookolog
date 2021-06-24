import { BookDoneLowerOrEqualTotalValidator } from './book-done-lower-or-equal-total-validator';
import { BookStatus } from '../../models/book-status';
import { Book } from '../../models/book';

describe('BookDoneLowerOrEqualTotalValidator', () => {
  it('should create an instance', () => {
    expect(new BookDoneLowerOrEqualTotalValidator()).toBeTruthy();
  });

  it('should pass non progress book', () => {
    const book = {
      status: BookStatus.Done,
      doneUnits: 100,
      totalUnits: -70,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book without done', () => {
    const book = {
      status: BookStatus.InProgress,
      totalUnits: 70,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book without total', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 100,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should return error for negative total', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 70,
      totalUnits: -100,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual({ error: 'UnitLowerThenZero' });
  });

  it('should return error for negative total', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: -70,
      totalUnits: 100,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual({ error: 'UnitLowerThenZero' });
  });

  it('should return error for done greatet total', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 170,
      totalUnits: 100,
    } as Book;

    const result = new BookDoneLowerOrEqualTotalValidator().validate(book);

    expect(result).toEqual({ error: 'DoneGreaterThenTotal' });
  });
});
