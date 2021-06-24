import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';

export class BookStatusRequiredValidator extends SingleEntityValidator<Book> {
  validate(entity: Book): EntityValidationResult | null {
    if (entity.status == null) {
      return {
        error: 'StatusIsRequired',
      };
    } else {
      return null;
    }
  }
}
