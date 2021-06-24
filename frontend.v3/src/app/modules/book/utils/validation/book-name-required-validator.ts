import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';

export class BookNameRequiredValidator extends SingleEntityValidator<Book> {
  validate(entity: Book): EntityValidationResult | null {
    if (!entity.name) {
      return {
        error: 'NameIsRequired',
      };
    } else {
      return null;
    }
  }
}
