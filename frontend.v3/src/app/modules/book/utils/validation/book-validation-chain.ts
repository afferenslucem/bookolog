import { EntityValidationChain } from '../../../../main/utils/model-validation/entity-validation-chain';
import { Book } from '../../models/book';
import { BookNameRequiredValidator } from './book-name-required-validator';
import { BookStatusRequiredValidator } from './book-status-required-validator';
import { BookFinishedDateFormatValidator } from './book-finished-date-format-validator';
import { BookStartDateFormatValidator } from './book-start-date-format-validator';
import { BookTypeRequiredValidator } from './book-type-required-validator';
import { BookStartDateGreaterOrEqualThenFinishDateValidator } from './book-start-date-greater-or-equal-then-finish-date-validator';
import { BookDoneLowerOrEqualTotalValidator } from './book-done-lower-or-equal-total-validator';

export class BookValidationChain extends EntityValidationChain<Book> {
  public constructor() {
    super([
      new BookNameRequiredValidator(),
      new BookStatusRequiredValidator(),
      new BookTypeRequiredValidator(),
      new BookStartDateFormatValidator(),
      new BookFinishedDateFormatValidator(),
      new BookStartDateGreaterOrEqualThenFinishDateValidator(),
      new BookDoneLowerOrEqualTotalValidator(),
    ]);
  }
}
