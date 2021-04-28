import { FuzzySearch } from './fuzzy-search';
import { BookData } from '../../modules/book/models/book-data';
import { Book } from '../../modules/book/models/book';

describe('FuzzySearch', () => {
  it('should create an instance', () => {
    expect(new FuzzySearch()).toBeTruthy();
  });

  it("should find 'Lord of The Rings'", () => {
    const names = ['Lord of The Rings', 'Harry Potter', 'Age of Death'];

    expect(new FuzzySearch().search(names, 'd of')).toEqual(['Lord of The Rings']);
  });

  it("should find 'Lord of The Rings' and 'Age of Death'", () => {
    const names = ['Lord of The Rings', 'Harry Potter', 'Age of Death'];

    expect(new FuzzySearch().search(names, 'of')).toEqual(['Lord of The Rings', 'Age of Death']);
  });

  it('should not find', () => {
    const names = ['Lord of The Rings', 'Harry Potter', 'Age of Death'];

    expect(new FuzzySearch().search(names, 'None')).toEqual([]);
  });

  it('should filter books by name and authors', () => {
    const books = [
      new Book({ name: 'Lord of The Rings', authors: ['John Ronald Reuel Tolkien'] } as BookData),
      new Book({ name: 'Harry Potter', authors: ['Joanne Rowling'] } as BookData),
      new Book({ name: 'Age of Death', authors: ['Andrey Kruz'] } as BookData),
      new Book({ name: 'Deathworld', authors: ['Harry Harrison'] } as BookData),
    ];

    expect(new FuzzySearch().search(books, 'harry')).toEqual([
      new Book({ name: 'Harry Potter', authors: ['Joanne Rowling'] } as BookData),
      new Book({ name: 'Deathworld', authors: ['Harry Harrison'] } as BookData),
    ]);
  });
});
