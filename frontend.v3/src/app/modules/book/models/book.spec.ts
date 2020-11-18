import { Book } from './book';
import { BookData } from './book-data';
import { BookStatus } from './book-status';
import { BookType } from './book-type';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book({
      guid: 'guid',
      name: 'name',
      type: 1,
      status: 1,
      modifyDate: '2020-11-18 10:57',
      createDate: '2020-11-18 10:57',
    })).toBeTruthy();
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
    expect(book.started).toEqual({
      year: undefined,
      month: undefined,
      day: undefined
    }, 'Different start dates');
    expect(book.finished).toEqual({
      year: undefined,
      month: undefined,
      day: undefined
    }, 'Different end dates');
    expect(book.type).toEqual(BookType.Electronic, 'Different types');
    expect(book.modifyDate).toEqual(new Date('2020-11-18 10:57:00'), 'Different modify dates');
    expect(book.createDate).toEqual(new Date('2020-11-18 09:57:00'), 'Different create dates');
    expect(book.note).toEqual(undefined, 'Different notes');
    expect(book.startDate).toEqual(null);
    expect(book.endDate).toEqual(null);
  });

  it('map full correct', () => {
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
      startDate: '2020-11-10 10:34',
      endDate: '2020-11-11 11:11'
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
    expect(book.started).toEqual({
      year: data.startDateYear,
      month: data.startDateMonth,
      day: data.startDateDay
    }, 'Different start dates');
    expect(book.finished).toEqual({
      year: data.endDateYear,
      month: data.endDateMonth,
      day: data.endDateDay
    }, 'Different end dates');
    expect(book.type).toEqual(BookType.Electronic, 'Different types');
    expect(book.modifyDate).toEqual(new Date('2020-11-18 10:57:00'), 'Different modify dates');
    expect(book.createDate).toEqual(new Date('2020-11-18 09:57:00'), 'Different create dates');
    expect(book.note).toEqual(data.note, 'Different notes');
    expect(book.startDate).toEqual(new Date(data.startDate));
    expect(book.endDate).toEqual(new Date(data.endDate));
  });
});
