import { BookNameRequiredValidator } from './book-name-required-validator';
import { Book } from '../../models/book';

describe('BookNameRequiredValidator', () => {
  it('should create an instance', () => {
    expect(new BookNameRequiredValidator()).toBeTruthy();
  });

  it('should return error for empty string', () => {
    const book = {
      name: '',
    } as Book;

    const result = new BookNameRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should return error for undefined', () => {
    const book = {} as Book;

    const result = new BookNameRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should return error for null', () => {
    const book = {
      name: null,
    } as Book;

    const result = new BookNameRequiredValidator().validate(book);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should pass book', () => {
    const book = {
      name: 'Государь',
    } as Book;

    const result = new BookNameRequiredValidator().validate(book);

    expect(result).toEqual(null);
  });
});
