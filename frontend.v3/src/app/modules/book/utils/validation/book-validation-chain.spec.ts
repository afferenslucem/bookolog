import { BookValidationChain } from './book-validation-chain';
import { Book } from '../../models/book';
import { BookStatus } from '../../models/book-status';

describe('BookValidationChain', () => {
  it('should create an instance', () => {
    expect(new BookValidationChain()).toBeTruthy();
  });

  it('should return name error', () => {
    const book = {
      name: null,
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(
      jasmine.objectContaining({
        NameIsRequired: undefined,
      }),
    );
  });

  it('should return status error', () => {
    const book = {
      status: null,
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(
      jasmine.objectContaining({
        StatusIsRequired: undefined,
      }),
    );
  });

  it('should return type error', () => {
    const book = {
      type: null,
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(
      jasmine.objectContaining({
        TypeIsRequired: undefined,
      }),
    );
  });

  it('should return started error', () => {
    const book = {
      started: {
        month: 6,
      },
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(jasmine.objectContaining({ DateFormatError: 'RequiresYear' }));
  });

  it('should return finished error', () => {
    const book = {
      finished: {
        year: 2020,
        month: 0,
      },
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(jasmine.objectContaining({ DateFormatError: 'MonthTooSmall' }));
  });

  it('should return date range error', () => {
    const book = {
      status: BookStatus.Done,
      finished: {
        year: 2020,
      },
      started: {
        year: 2021,
      },
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(jasmine.objectContaining({ StartedDateGreaterThenFinished: undefined }));
  });

  it('should return progress range error', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: 170,
      totalUnits: 100,
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(jasmine.objectContaining({ DoneGreaterThenTotal: undefined }));
  });

  it('should return progress range error', () => {
    const book = {
      status: BookStatus.InProgress,
      doneUnits: -100,
      totalUnits: 100,
    } as Book;

    const result = new BookValidationChain().validate(book);

    expect(result).toEqual(jasmine.objectContaining({ UnitLowerThenZero: undefined }));
  });
});
