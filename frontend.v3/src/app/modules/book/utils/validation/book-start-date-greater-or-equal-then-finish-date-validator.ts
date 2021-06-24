import { SingleEntityValidator } from '../../../../main/utils/model-validation/single-entity-validator';
import { Book } from '../../models/book';
import { EntityValidationResult } from '../../../../main/utils/model-validation/entity-validation-result';
import { BookStatus } from '../../models/book-status';
import { BookDate } from '../../models/book-date';

export class BookStartDateGreaterOrEqualThenFinishDateValidator extends SingleEntityValidator<Book> {
  validate(entity: Book): EntityValidationResult | null {
    if (BookStartDateGreaterOrEqualThenFinishDateValidator.shouldPassCheck(entity)) {
      return null;
    }

    const finished = entity.finished;
    const started = entity.started;

    return BookStartDateGreaterOrEqualThenFinishDateValidator.checkDates(started, finished);
  }

  public static checkDates(started: BookDate, finished: BookDate): EntityValidationResult | null {
    const finishedDate = new Date(finished.year || 0, finished.month || 0, finished.day || 0);
    const startedDate = new Date(started.year || 0, started.month || 0, started.day || 0);

    if (startedDate > finishedDate) {
      return {
        error: 'StartedDateGreaterThenFinished',
      };
    } else {
      return null;
    }
  }

  private static shouldPassCheck(book: Book): boolean {
    const filledBothFields = book.finished?.year != null && book.started?.year != null;
    const bookIsDone = Number(book.status) === BookStatus.Done;

    return !filledBothFields || !bookIsDone;
  }
}
