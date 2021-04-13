import { Book } from './book';
import { BookData } from './book-data';
import { BookStatus } from './book-status';
import { BookType } from './book-type';
import { ProgressAlgorithmType } from './progress-algorithm-type';

describe('Book', () => {
  it('should create an instance', () => {
    expect(
      new Book({
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 10:57',
      }),
    ).toBeTruthy();
  });

  it('map empty correct', () => {
    const data: BookData = {
      guid: 'guid',
      name: 'name',
      type: 1,
      status: 1,
      modifyDate: '2020-11-18 10:57',
      createDate: '2020-11-18 09:57',
    };

    const book = new Book(data);

    expect(book.guid).toEqual(data.guid, 'Different guids');
    expect(book.name).toEqual(data.name, 'Different names');
    expect(book.authors).toEqual([], 'Different authors');
    expect(book.year).toEqual(undefined, 'Different years');
    expect(book.status).toEqual(BookStatus.InProgress, 'Different statuses');
    expect(book.tags).toEqual([], 'Different tags');
    expect(book.totalUnits).toEqual(0, 'Different totalUnits');
    expect(book.doneUnits).toEqual(0, 'Different doneUnits');
    expect(book.genre).toEqual(undefined, 'Different genres');
    expect(book.started).toEqual(
      {
        year: undefined,
        month: undefined,
        day: undefined,
      },
      'Different start dates',
    );

    expect(book.finished).toEqual(
      {
        year: undefined,
        month: undefined,
        day: undefined,
      },
      'Different end dates',
    );

    expect(book.type).toEqual(BookType.Electronic, 'Different types');
    expect(book.modifyDate).toEqual(new Date('2020-11-18 10:57:00'), 'Different modify dates');
    expect(book.createDate).toEqual(new Date('2020-11-18 09:57:00'), 'Different create dates');
    expect(book.note).toEqual(undefined, 'Different notes');
    expect(book.startDate).toEqual(null);
    expect(book.endDate).toEqual(null);
    expect(book.progressPercents).toEqual(0);
    expect(book.rereadingBookGuid).toEqual(null);
    expect(book.rereadedBy).toEqual([]);
  });

  it('map full correct', () => {
    const data: BookData = {
      guid: 'guid',
      name: 'name',
      authors: ['author1', 'author2'],
      year: 2020,
      status: 1,
      tags: ['tag1', 'tag2'],
      totalUnits: 200,
      doneUnits: 100,
      genre: 'genre',
      startDateYear: 2019,
      startDateMonth: 1,
      startDateDay: 2,
      endDateYear: 2020,
      endDateMonth: 3,
      endDateDay: 4,
      note: 'note',
      type: 1,
      modifyDate: '2020-11-18 10:57',
      createDate: '2020-11-18 09:57',
      startDate: '2020-11-10 10:34',
      endDate: '2020-11-11 11:11',
      rereadedBy: ['guid1', 'guid2'],
      rereadingBookGuid: 'guid3',
    };

    const book = new Book(data);

    expect(book.guid).toEqual(data.guid, 'Different guids');
    expect(book.name).toEqual(data.name, 'Different names');
    expect(book.authors).toEqual(data.authors, 'Different authors');
    expect(book.year).toEqual(data.year, 'Different years');
    expect(book.status).toEqual(BookStatus.InProgress, 'Different statuses');
    expect(book.tags).toEqual(data.tags, 'Different tags');
    expect(book.totalUnits).toEqual(data.totalUnits, 'Different totalUnits');
    expect(book.doneUnits).toEqual(data.doneUnits, 'Different doneUnits');
    expect(book.genre).toEqual(data.genre, 'Different genres');
    expect(book.started).toEqual(
      {
        year: data.startDateYear,
        month: data.startDateMonth,
        day: data.startDateDay,
      },
      'Different start dates',
    );

    expect(book.finished).toEqual(
      {
        year: data.endDateYear,
        month: data.endDateMonth,
        day: data.endDateDay,
      },
      'Different end dates',
    );

    expect(book.type).toEqual(BookType.Electronic, 'Different types');
    expect(book.modifyDate).toEqual(new Date('2020-11-18 10:57:00'), 'Different modify dates');
    expect(book.createDate).toEqual(new Date('2020-11-18 09:57:00'), 'Different create dates');
    expect(book.note).toEqual(data.note, 'Different notes');
    expect(book.startDate).toEqual(new Date(data.startDate));
    expect(book.endDate).toEqual(new Date(data.endDate));
    expect(book.progressPercents).toEqual(50);
    expect(book.rereadedBy).toEqual(['guid1', 'guid2']);
    expect(book.rereadingBookGuid).toEqual('guid3');
  });

  it('map without dates correct', () => {
    const data: BookData = {
      guid: 'guid',
      name: 'name',
      authors: ['author1', 'author2'],
      year: 2020,
      status: 1,
      tags: ['tag1', 'tag2'],
      totalUnits: 100,
      doneUnits: 200,
      genre: 'genre',
      startDateYear: 2019,
      startDateMonth: 1,
      startDateDay: 2,
      endDateYear: 2020,
      endDateMonth: 3,
      endDateDay: 4,
      note: 'note',
      type: 1,
      modifyDate: '2020-11-18 10:57',
      createDate: '2020-11-18 09:57',
    };

    const book = new Book(data);

    expect(book.guid).toEqual(data.guid, 'Different guids');
    expect(book.name).toEqual(data.name, 'Different names');
    expect(book.authors).toEqual(data.authors, 'Different authors');
    expect(book.year).toEqual(data.year, 'Different years');
    expect(book.status).toEqual(BookStatus.InProgress, 'Different statuses');
    expect(book.tags).toEqual(data.tags, 'Different tags');
    expect(book.totalUnits).toEqual(data.totalUnits, 'Different totalUnits');
    expect(book.doneUnits).toEqual(data.doneUnits, 'Different doneUnits');
    expect(book.genre).toEqual(data.genre, 'Different genres');
    expect(book.started).toEqual(
      {
        year: data.startDateYear,
        month: data.startDateMonth,
        day: data.startDateDay,
      },
      'Different start dates',
    );

    expect(book.finished).toEqual(
      {
        year: data.endDateYear,
        month: data.endDateMonth,
        day: data.endDateDay,
      },
      'Different end dates',
    );

    expect(book.type).toEqual(BookType.Electronic, 'Different types');
    expect(book.modifyDate).toEqual(new Date('2020-11-18 10:57:00'), 'Different modify dates');
    expect(book.createDate).toEqual(new Date('2020-11-18 09:57:00'), 'Different create dates');
    expect(book.note).toEqual(data.note, 'Different notes');
    expect(book.startDate).toEqual(new Date('2019-01-02 00:00:00'));
    expect(book.endDate).toEqual(new Date('2020-03-04 00:00:00'));
  });

  describe('Done property', () => {
    let book: Book = null;

    beforeEach(() => {
      book = new Book({
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 10:57',
      });
    });

    it('Left progress', () => {
      book.progressType = ProgressAlgorithmType.Left;
      book.totalUnits = 200;
      book.doneUnits = 50;

      expect(book.done).toEqual(150);
    });

    it('Left progress with null done', () => {
      book.progressType = ProgressAlgorithmType.Left;
      book.totalUnits = 200;
      book.doneUnits = null;

      expect(book.done).toEqual(null);
    });

    it('Left progress with null total', () => {
      book.progressType = ProgressAlgorithmType.Left;
      book.totalUnits = null;
      book.doneUnits = 50;

      expect(book.done).toEqual(null);
    });

    it('Done progress', () => {
      book.progressType = ProgressAlgorithmType.Done;
      book.totalUnits = 200;
      book.doneUnits = 50;

      expect(book.done).toEqual(50);
    });
  });
});
