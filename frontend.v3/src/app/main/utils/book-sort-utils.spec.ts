import { BookSortUtils } from './book-sort-utils';
import { Book } from '../../modules/book/models/book';
import _ from 'declarray';

describe('BookSortUtils', () => {
  it('should create an instance', () => {
    expect(new BookSortUtils()).toBeTruthy();
  });

  describe('sortGenresByCountDesc', () => {
    it('sort empty', () => {
      const result = new BookSortUtils().sortGenresByCountDesc([]);

      expect(result).toEqual([]);
    });

    it('sort by count', () => {
      const result = new BookSortUtils().sortGenresByCountDesc([
        { genre: 'genre1' },
        { genre: 'genre2' },
        { genre: 'genre1' },
        { genre: 'genre3' },
        { genre: 'genre3' },
        { genre: 'genre3' },
      ] as Book[]);

      expect(result).toEqual(['genre3', 'genre1', 'genre2']);
    });

    it('sort by alphabet', () => {
      const result = new BookSortUtils().sortGenresByCountDesc([{ genre: 'c' }, { genre: 'b' }, { genre: 'a' }] as Book[]);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('sort without empty', () => {
      const result = new BookSortUtils().sortGenresByCountDesc([
        { genre: 'c' },
        { genre: 'b' },
        { genre: 'a' },
        {},
        { genre: '' },
      ] as Book[]);

      expect(result).toEqual(['a', 'b', 'c']);
    });
  });

  describe('sortAuthorsByCountDesc$', () => {
    it('sort empty', async () => {
      const result = await new BookSortUtils().sortAuthorsByCountDesc$([]);

      expect(result).toEqual([]);
    });

    it('sort by count', async () => {
      const result = await new BookSortUtils().sortAuthorsByCountDesc$([
        { authors: ['author1', 'author2'] },
        { authors: ['author2'] },
        { authors: ['author3', 'author2'] },
      ] as Book[]);

      expect(result).toEqual(['author2', 'author1', 'author3']);
    });

    it('sort by alphabet', async () => {
      const result = await new BookSortUtils().sortAuthorsByCountDesc$([
        { authors: ['c', 'b'] },
        { authors: ['a'] },
        { authors: ['d'] },
      ] as Book[]);

      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('sort without empty', async () => {
      const result = await new BookSortUtils().sortAuthorsByCountDesc$([
        { authors: ['c'] },
        { authors: ['b'] },
        { authors: ['a'] },
        {},
        { authors: [] },
      ] as Book[]);

      expect(result).toEqual(['a', 'b', 'c']);
    });
  });

  describe('sortTagsByCountDesc$', () => {
    it('sort empty', async () => {
      const result = await new BookSortUtils().sortTagsByCountDesc$([]);

      expect(result).toEqual([]);
    });

    it('sort by count', async () => {
      const result = await new BookSortUtils().sortTagsByCountDesc$([
        { tags: ['tag1', 'tag2'] },
        { tags: ['tag2'] },
        { tags: ['tag3', 'tag2'] },
      ] as Book[]);

      expect(result).toEqual(['tag2', 'tag1', 'tag3']);
    });

    it('sort by alphabet', async () => {
      const result = await new BookSortUtils().sortTagsByCountDesc$([{ tags: ['c', 'b'] }, { tags: ['a'] }, { tags: ['d'] }] as Book[]);

      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('sort without empty', async () => {
      const result = await new BookSortUtils().sortTagsByCountDesc$([
        { tags: ['c'] },
        { tags: ['b'] },
        { tags: ['a'] },
        {},
        { tags: [] },
      ] as Book[]);

      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('sort without empty', async () => {
      const data: any = [];

      _.range(0, 10)
        .toArray()
        .forEach(() => data.push({ tags: ['a'] }));
      _.range(0, 100)
        .toArray()
        .forEach(() => data.push({ tags: ['b'] }));
      _.range(0, 75)
        .toArray()
        .forEach(() => data.push({ tags: ['c'] }));
      _.range(0, 75)
        .toArray()
        .forEach(() => data.push({ tags: [] }));
      _.range(0, 50)
        .toArray()
        .forEach(() => data.push({ tags: ['d'] }));

      const result = await new BookSortUtils().sortTagsByCountDesc$(data as Book[]);

      expect(result).toEqual(['b', 'c', 'd', 'a']);
    });
  });
});
