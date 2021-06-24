import { BookStatusRequiredValidator } from './book-status-required-validator';
import { Book } from '../../models/book';
import { BookNameRequiredValidator } from './book-name-required-validator';
import { BookStatus } from '../../models/book-status';

describe('BookStatusRequiredValidator', () => {
  it('should create an instance', () => {
    expect(new BookStatusRequiredValidator()).toBeTruthy();
  });

  it('should return error for undefined', () => {
    const book = {} as Book;

    const result = new BookStatusRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'StatusIsRequired',
    });
  });

  it('should return error for null', () => {
    const book = {
      status: null,
    } as Book;

    const result = new BookStatusRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'StatusIsRequired',
    });
  });

  it('should pass book', () => {
    const book = {
      status: BookStatus.ToRead,
    } as Book;

    const result = new BookStatusRequiredValidator().validate(book);

    expect(result).toEqual(null);
  });
});
