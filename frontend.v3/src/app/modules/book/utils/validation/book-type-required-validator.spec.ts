import { BookTypeRequiredValidator } from './book-type-required-validator';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';

describe('BookTypeRequiredValidator', () => {
  it('should create an instance', () => {
    expect(new BookTypeRequiredValidator()).toBeTruthy();
  });

  it('should return error for undefined', () => {
    const book = {} as Book;

    const result = new BookTypeRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'TypeIsRequired',
    });
  });

  it('should return error for null', () => {
    const book = {
      type: null,
    } as Book;

    const result = new BookTypeRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'TypeIsRequired',
    });
  });

  it('should pass book', () => {
    const book = {
      type: BookType.Paper,
    } as Book;

    const result = new BookTypeRequiredValidator().validate(book);

    expect(result).toEqual(null);
  });
});
