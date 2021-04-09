import { BookStatus } from '../models/book-status';
import { BookType } from '../models/book-type';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { BookDataForm } from './book-data-form';
import { ProgressAlgorithmSolver } from './progress-algorithm-solver';
import { FormGroup } from '@angular/forms';
import { Book } from '../models/book';

export class AbstractBookDataForm {
  public BookType: typeof BookType = BookType;
  public BookStatus: typeof BookStatus = BookStatus;
  public ProgressAlgorithm: typeof ProgressAlgorithmType = ProgressAlgorithmType;
  public bookForm: BookDataForm = null;

  public get status(): BookStatus {
    return this.bookForm.status;
  }

  public get type(): BookType {
    return this.bookForm.type;
  }

  public get progressAlgorithm(): ProgressAlgorithmType {
    return this.bookForm.progressType;
  }

  public get genre(): string {
    return this.bookForm.genre;
  }

  public get progressAlgorithmPreference(): ProgressAlgorithmType {
    return ProgressAlgorithmSolver.getAlgorithm(this.type);
  }

  public set progressAlgorithmPreference(v: ProgressAlgorithmType) {
    ProgressAlgorithmSolver.setAlgorithm(this.type, v);
  }


  public get form(): FormGroup {
    return this.bookForm.form;
  }

  public get book(): Book {
    return this.bookForm.snapshot;
  }
}
