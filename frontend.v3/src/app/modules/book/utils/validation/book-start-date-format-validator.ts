import { BookDateFormatValidator } from './book-date-format-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from 'src/app/main/utils/model-validation/entity-validation-result';

export class BookStartDateFormatValidator extends BookDateFormatValidator {
  public validate(entity: Book): EntityValidationResult | null {
    if (entity.started == null) {
      return null;
    }

    return BookDateFormatValidator.validateDate(entity.started);
  }
}
