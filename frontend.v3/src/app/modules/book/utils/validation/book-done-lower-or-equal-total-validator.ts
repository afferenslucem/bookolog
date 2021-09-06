import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';
import { BookStatus } from '../../models/book-status';

export class BookDoneLowerOrEqualTotalValidator extends SingleEntityValidator<Book> {
  public static checkProgress(done: number, total: number): EntityValidationResult | null {
    if (done > total) {
      return {
        error: 'DoneGreaterThenTotal',
      };
    } else {
      return null;
    }
  }

  public static checkUnits(units: number): EntityValidationResult | null {
    if (units < 0) {
      return {
        error: 'UnitLowerThenZero',
      };
    } else {
      return null;
    }
  }

  private static shouldPassCheck(book: Book): boolean {
    const filledBothFields = book.doneUnits != null && book.totalUnits != null;
    const bookIsProgress = Number(book.status) === BookStatus.InProgress;

    return !filledBothFields || !bookIsProgress;
  }

  validate(entity: Book): EntityValidationResult | null {
    if (BookDoneLowerOrEqualTotalValidator.shouldPassCheck(entity)) {
      return null;
    }

    const done = entity.doneUnits;
    const doneCheck = BookDoneLowerOrEqualTotalValidator.checkUnits(done);
    if (doneCheck != null) {
      return doneCheck;
    }

    const total = entity.totalUnits;

    const totalCheck = BookDoneLowerOrEqualTotalValidator.checkUnits(total);
    if (totalCheck != null) {
      return totalCheck;
    }

    return BookDoneLowerOrEqualTotalValidator.checkProgress(done, total);
  }
}
