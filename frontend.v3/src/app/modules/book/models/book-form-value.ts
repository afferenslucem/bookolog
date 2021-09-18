import { BookStatus } from './book-status';
import { BookType } from './book-type';
import { BookData } from './book-data';
import { ProgressAlgorithmType } from './progress-algorithm-type';
import { TimeProgress } from './time-progress';

export interface BookFormValue {
  name: string;
  year: number;
  genre: string;
  collectionGuid: string;
  collectionOrder: number;
  status: BookStatus;
  type: BookType;
  started: BookData;
  finished: BookData;
  done: number | TimeProgress;
  total: number | TimeProgress;
  authors: string[];
  tags: string[];
  note: string;
  progressType: ProgressAlgorithmType;
}
