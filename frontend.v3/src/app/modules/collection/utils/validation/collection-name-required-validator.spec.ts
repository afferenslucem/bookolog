import { CollectionNameRequiredValidator } from './collection-name-required-validator';
import { Collection } from '../../models/collection';

describe('CollectionNameRequiredValidator', () => {
  it('should create an instance', () => {
    expect(new CollectionNameRequiredValidator()).toBeTruthy();
  });

  it('should return error for empty object', () => {
    const collection = {} as Collection;

    const result = new CollectionNameRequiredValidator().validate(collection);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should return error for null name', () => {
    const collection = {
      name: null,
    } as Collection;

    const result = new CollectionNameRequiredValidator().validate(collection);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should return error for empty string', () => {
    const collection = {
      name: '',
    } as Collection;

    const result = new CollectionNameRequiredValidator().validate(collection);

    expect(result).toEqual({
      error: 'NameIsRequired',
    });
  });

  it('should pass', () => {
    const collection = {
      name: 'qwerty',
    } as Collection;

    const result = new CollectionNameRequiredValidator().validate(collection);

    expect(result).toEqual(null);
  });
});
