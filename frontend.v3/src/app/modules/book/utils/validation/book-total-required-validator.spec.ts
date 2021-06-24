import { BookTotalRequiredValidator } from './book-total-required-validator';
import { BookStatus } from '../../models/book-status';
import { Book } from '../../models/book';

describe('BookTotalRequiredValidator', () => {
  it('should create an instance', () => {
    expect(new BookTotalRequiredValidator()).toBeTruthy();
  });

  it('should pass non progress book', () => {
    const book = {
      status: BookStatus.Done,
      doneUnits: 100,
    } as Book;

    const result = new BookTotalRequiredValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book with correct range', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 100,
      totalUnits: 100,
    } as Book;

    const result = new BookTotalRequiredValidator().validate(book);

    expect(result).toEqual(null);
  });

  it('should pass book with correct range', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 100,
    } as Book;

    const result = new BookTotalRequiredValidator().validate(book);

    expect(result).toEqual({ error: 'TotalIsRequired' });
  });
});
