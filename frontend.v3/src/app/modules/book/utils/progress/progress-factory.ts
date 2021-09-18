import { BookProgress } from './book-progress';
import { BookType } from '../../models/book-type';
import { TimeBookProgress } from './time-book-progress';
import { PageBookProgress } from './page-book-progress';
import { ProgressAlgorithmType } from '../../models/progress-algorithm-type';

export class ProgressFactory {
  public static getProgress(bookType: BookType): BookProgress;
  public static getProgress(bookType: BookType, progressType: ProgressAlgorithmType): BookProgress;
  public static getProgress(bookType: BookType, progressType = ProgressAlgorithmType.Done): BookProgress {
    if (bookType === BookType.Audio) {
      const result = new TimeBookProgress();
      result.progressType = progressType;

      return result;
    } else {
      const result = new PageBookProgress();
      result.progressType = progressType;

      return result;
    }
  }
}
