import {BookDataForm} from './book-data-form';
import {BookStatus} from '../models/book-status';
import {first} from 'rxjs/operators';
import {BookType} from '../models/book-type';
import {ProgressAlgorithmType} from '../models/progress-algorithm-type';

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
      bookDataForm.form.get('genre').setValue('genre');
      const result = await observable;
      expect(result).toEqual('genre');
    });

    it('statusChanges', async () => {
      const observable = bookDataForm.statusChanges.pipe(first()).toPromise();
      bookDataForm.form.get('status').setValue(BookStatus.Done);
      const result = await observable;
      expect(result).toEqual(BookStatus.Done);
    });

    it('typeChanges', async () => {
      const observable = bookDataForm.typeChanges.pipe(first()).toPromise();
      bookDataForm.form.get('type').setValue(BookType.Electronic);
      const result = await observable;
      expect(result).toEqual(BookType.Electronic);
    });

    it('progressTypeChanges', async () => {
      const observable = bookDataForm.progressTypeChanges.pipe(first()).toPromise();
      bookDataForm.form.get('progressType').setValue(ProgressAlgorithmType.Left);
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

    it('totalUnitsControl', () => {
      const control = bookDataForm.totalUnitsControl;

      expect(control).toBeTruthy();
    });

    it('doneUnitsControl', () => {
      const control = bookDataForm.doneUnitsControl;

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

    it('totalUnits', () => {
      bookDataForm.snapshot.totalUnits = 100;

      bookDataForm.build();

      expect(bookDataForm.totalUnits).toEqual(100);
    });

    it('doneUnits', () => {
      bookDataForm.snapshot.doneUnits = 100;

      bookDataForm.build();

      expect(bookDataForm.doneUnits).toEqual(100);
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

      const result = bookDataForm.form.get('status').value;

      expect(result).toEqual(BookStatus.Done);
    });

    it('started', () => {
      bookDataForm.started = {
        year: 2021,
        month: 3,
        day: 12
      };

      const result = bookDataForm.form.get('started').value;

      expect(result).toEqual({
        year: 2021,
        month: 3,
        day: 12
      });
    });

    it('finished', () => {
      bookDataForm.finished = {
        year: 2021,
        month: 4,
        day: 14,
      };

      const result = bookDataForm.form.get('finished').value;

      expect(result).toEqual({
        year: 2021,
        month: 4,
        day: 14,
      });
    });

    it('doneUnits', () => {
      bookDataForm.doneUnits = 100;

      const result = bookDataForm.form.get('doneUnits').value;

      expect(result).toEqual(100);
    });

    it('totalUnits', () => {
      bookDataForm.totalUnits = 120;

      const result = bookDataForm.form.get('totalUnits').value;

      expect(result).toEqual(120);
    });

    it('type', () => {
      bookDataForm.type = BookType.Electronic;

      const result = bookDataForm.form.get('type').value;

      expect(result).toEqual(BookType.Electronic);
    });

    it('progressType', () => {
      bookDataForm.progressType = ProgressAlgorithmType.Left;

      const result = bookDataForm.form.get('progressType').value;

      expect(result).toEqual(ProgressAlgorithmType.Left);
    });
  });
});
