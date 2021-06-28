import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Collection } from '../../models/collection';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';

export class CollectionNameRequiredValidator extends SingleEntityValidator<Collection> {
  public validate(entity: Collection): EntityValidationResult | null {
    if (!entity.name) {
      return {
        error: 'NameIsRequired',
      };
    } else {
      return null;
    }
  }
}
