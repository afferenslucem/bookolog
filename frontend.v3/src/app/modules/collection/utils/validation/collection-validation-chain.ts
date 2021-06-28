import { EntityValidationChain } from '../../../../main/utils/model-validation/entity-validation-chain';
import { Collection } from '../../models/collection';
import { CollectionNameRequiredValidator } from './collection-name-required-validator';

export class CollectionValidationChain extends EntityValidationChain<Collection> {
  public constructor() {
    super([new CollectionNameRequiredValidator()]);
  }
}
