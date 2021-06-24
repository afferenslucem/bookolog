import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';
import { BookStatus } from '../../models/book-status';

export class BookTotalRequiredValidator extends SingleEntityValidator<Book> {
  validate(entity: Book): EntityValidationResult | null {
    if (Number(entity.status) !== BookStatus.InProgress) {
      return null;
    }

    if (entity.doneUnits != null && entity.totalUnits == null) {
      return {
        error: 'TotalIsRequired',
      };
    } else {
      return null;
    }
  }
}
