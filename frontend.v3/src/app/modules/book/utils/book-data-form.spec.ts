import { BookDataForm } from './book-data-form';
import { BookStatus } from '../models/book-status';
import { first } from 'rxjs/operators';
import { BookType } from '../models/book-type';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';

describe('BookDataForm', () => {
  it('should create an instance', () => {
    expect(new BookDataForm()).toBeTruthy();
  });

  describe('Observables', () => {
    let bookDataForm: BookDataForm = null;

    beforeEach(() => {
      bookDataForm = new BookDataForm();
      bookDataForm.build();
    });

    it('genreChanges', async () => {
      const observable = bookDataForm.genreChanges.pipe(first()).toPromise();
      bookDataForm.nativeForm.get('genre').setValue('genre');
      const result = await observable;

      expect(result).toEqual('genre');
    });

    it('statusChanges', async () => {
      const observable = bookDataForm.statusChanges.pipe(first()).toPromise();
      bookDataForm.nativeForm.get('status').setValue(BookStatus.Done);
      const result = await observable;

      expect(result).toEqual(BookStatus.Done);
    });

    it('typeChanges', async () => {
      const observable = bookDataForm.typeChanges.pipe(first()).toPromise();
      bookDataForm.nativeForm.get('type').setValue(BookType.Electronic);
      const result = await observable;

      expect(result).toEqual(BookType.Electronic);
    });

    it('progressTypeChanges', async () => {
      const observable = bookDataForm.progressTypeChanges.pipe(first()).toPromise();
      bookDataForm.nativeForm.get('progressType').setValue(ProgressAlgorithmType.Left);
      const result = await observable;

      expect(result).toEqual(ProgressAlgorithmType.Left);
    });
  });

  describe('Controls', () => {
    let bookDataForm: BookDataForm = null;

    beforeEach(() => {
      bookDataForm = new BookDataForm();
      bookDataForm.build();
    });

    it('statusControl', () => {
      const control = bookDataForm.statusControl;

      expect(control).toBeTruthy();
    });

    it('genreControl', () => {
      const control = bookDataForm.genreControl;

      expect(control).toBeTruthy();
    });

    it('typeControl', () => {
      const control = bookDataForm.typeControl;

      expect(control).toBeTruthy();
    });

    it('progressTypeControl', () => {
      const control = bookDataForm.progressTypeControl;

      expect(control).toBeTruthy();
    });

    it('totalControl', () => {
      const control = bookDataForm.totalControl;

      expect(control).toBeTruthy();
    });

    it('doneControl', () => {
      const control = bookDataForm.doneControl;

      expect(control).toBeTruthy();
    });

    it('startedControl', () => {
      const control = bookDataForm.startedControl;

      expect(control).toBeTruthy();
    });

    it('finishedControl', () => {
      const control = bookDataForm.finishedControl;

      expect(control).toBeTruthy();
    });
  });

  describe('Getters', () => {
    let bookDataForm: BookDataForm = null;

    beforeEach(() => {
      bookDataForm = new BookDataForm();
    });

    it('status', () => {
      bookDataForm.snapshot.status = BookStatus.Done;
      bookDataForm.build();

      expect(bookDataForm.status).toEqual(BookStatus.Done);
    });

    it('collectionGuid', () => {
      bookDataForm.snapshot.collectionGuid = 'guid1';
      bookDataForm.build();

      expect(bookDataForm.collectionGuid).toEqual('guid1');
    });

    it('genre', () => {
      bookDataForm.snapshot.genre = 'genre';
      bookDataForm.build();

      expect(bookDataForm.genre).toEqual('genre');
    });

    it('total', () => {
      bookDataForm.snapshot.totalUnits = 100;

      bookDataForm.build();

      expect(bookDataForm.total).toEqual(100);
    });

    it('done', () => {
      bookDataForm.snapshot.doneUnits = 100;

      bookDataForm.build();

      expect(bookDataForm.done).toEqual(100);
    });

    it('type', () => {
      bookDataForm.snapshot.type = BookType.Electronic;

      bookDataForm.build();

      expect(bookDataForm.type).toEqual(BookType.Electronic);
    });

    it('progressType', () => {
      bookDataForm.snapshot.progressType = ProgressAlgorithmType.Left;

      bookDataForm.build();

      expect(bookDataForm.progressType).toEqual(ProgressAlgorithmType.Left);
    });

    it('started', () => {
      bookDataForm.snapshot.started = {
        day: 1,
        month: 2,
        year: 2003,
      };

      bookDataForm.build();

      expect(bookDataForm.started).toEqual({
        day: 1,
        month: 2,
        year: 2003,
      });
    });

    it('finished', () => {
      bookDataForm.snapshot.finished = {
        day: 1,
        month: 2,
        year: 2003,
      };

      bookDataForm.build();

      expect(bookDataForm.finished).toEqual({
        day: 1,
        month: 2,
        year: 2003,
      });
    });
  });

  describe('Setters', () => {
    let bookDataForm: BookDataForm = null;

    beforeEach(() => {
      bookDataForm = new BookDataForm();
      bookDataForm.build();
    });

    it('status', () => {
      bookDataForm.status = BookStatus.Done;

      const result = bookDataForm.nativeForm.get('status').value;

      expect(result).toEqual(BookStatus.Done);
    });

    it('started', () => {
      bookDataForm.started = {
        year: 2021,
        month: 3,
        day: 12,
      };

      const result = bookDataForm.nativeForm.get('started').value;

      expect(result).toEqual({
        year: 2021,
        month: 3,
        day: 12,
      });
    });

    it('finished', () => {
      bookDataForm.finished = {
        year: 2021,
        month: 4,
        day: 14,
      };

      const result = bookDataForm.nativeForm.get('finished').value;

      expect(result).toEqual({
        year: 2021,
        month: 4,
        day: 14,
      });
    });

    it('done', () => {
      bookDataForm.done = 100;

      const result = bookDataForm.nativeForm.get('done').value;

      expect(result).toEqual(100);
    });

    it('total', () => {
      bookDataForm.total = 120;

      const result = bookDataForm.nativeForm.get('total').value;

      expect(result).toEqual(120);
    });

    it('type', () => {
      bookDataForm.type = BookType.Electronic;

      const result = bookDataForm.nativeForm.get('type').value;

      expect(result).toEqual(BookType.Electronic);
    });

    it('progressType', () => {
      bookDataForm.progressType = ProgressAlgorithmType.Left;

      const result = bookDataForm.nativeForm.get('progressType').value;

      expect(result).toEqual(ProgressAlgorithmType.Left);
    });
  });
});
