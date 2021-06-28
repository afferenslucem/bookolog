import { CollectionValidationChain } from './collection-validation-chain';
import { Collection } from '../../models/collection';

describe('CollectionValidationChain', () => {
  it('should create an instance', () => {
    expect(new CollectionValidationChain()).toBeTruthy();
  });

  it('should return name error', () => {
    const collection = {
      name: null,
    } as Collection;

    const result = new CollectionValidationChain().validate(collection);

    expect(result).toEqual(
      jasmine.objectContaining({
        NameIsRequired: undefined,
      }),
    );
  });
});
