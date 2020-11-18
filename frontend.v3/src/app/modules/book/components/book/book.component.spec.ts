import { Book } from '../../models/book';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  it('should create an instance', () => {
    expect(new BookComponent()).toBeTruthy();
  });

  describe('Full filled book', () => {
    let component: BookComponent = null;
    let book: Book = null;

    beforeEach(() => {
      component = new BookComponent();
      book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        startDate: '2020-11-18 16:10',
        doneUnits: 100,
        totalUnits: 200,
        authors: ['author1', 'author2'],
        status: 1,
        type: 1,
      });

      component.innerBook = book;
    });

    it('check fields', () => {
      expect(component.name).toEqual(book.name);
      expect(component.startDate).toEqual(book.startDate);
      expect(component.progressValue).toEqual(50);
      expect(component.total).toEqual(book.totalUnits);
      expect(component.done).toEqual(book.doneUnits);
      expect(component.guid).toEqual(book.guid);
      expect(component.authors).toEqual(book.authors);
    });
  });

  describe('Min filled book', () => {
    let component: BookComponent = null;
    let book: Book = null;

    beforeEach(() => {
      component = new BookComponent();
      book = new Book({
        guid: 'guid',
        name: 'name',
        createDate: '2020-11-18 16:04',
        modifyDate: '2020-11-18 16:04',
        status: 1,
        type: 1,
      });

      component.innerBook = book;
    });

    it('check fields', () => {
      expect(component.name).toEqual(book.name);
      expect(component.startDate).toEqual(null);
      expect(component.progressValue).toEqual(0);
      expect(component.total).toEqual(book.totalUnits);
      expect(component.done).toEqual(book.doneUnits);
      expect(component.guid).toEqual(book.guid);
      expect(component.authors).toEqual(book.authors);
    });
  });
});
