import { Book } from '../../modules/book/models/book';
import _, { IGroupedData, ISequence } from 'declarray';
import { StringComparator } from './string-comparator';
import { IEntity } from '../models/i-entity';
import { Entity } from '../models/entity';
import { Observable } from 'rxjs';

export class BookSortUtils {
  public static skipEmpty<T>(seq: ISequence<T>): ISequence<T> {
    return seq.where(Boolean);
  }

  public static countAndSort(seq: ISequence<string>): ISequence<string> {
    const filled = BookSortUtils.skipEmpty(seq);
    const counted = BookSortUtils.count(filled);
    const ordered = BookSortUtils.sortCountedDesc(counted);
    const result = BookSortUtils.getKey(ordered);

    return result;
  }

  public static count(seq: ISequence<string>): ISequence<IGroupedData<string, number>> {
    return seq.groupBy(
      item => item,
      new StringComparator(),
      grouped => grouped.count(),
    );
  }

  public static sortCountedDesc(counted: ISequence<IGroupedData<string, number>>): ISequence<IGroupedData<string, number>> {
    return counted.orderByDescending(item => item.group).thenBy(item => item.key);
  }

  public static getKey(ordered: ISequence<IGroupedData<string, number>>): ISequence<string> {
    return ordered.select(item => item.key);
  }

  public static sortEntitiesByUsageTimeDesc<T extends IEntity | Entity>(entities: ISequence<T>): ISequence<T> {
    const result = entities.orderByDescending(item => +(item.modifyDate || null)).thenByDescending(item => +(item.createDate || null));

    return result;
  }

  public sortGenresByCountDesc(books: Book[]): string[] {
    const genres = _(books).select(item => item.genre);
    const result = BookSortUtils.countAndSort(genres);

    return result.toArray();
  }

  public sortAuthorsByCountDesc(books: Book[]): string[] {
    const authors = _(books)
      .where(item => !!item.authors?.length)
      .selectMany(item => item.authors);
    const result = BookSortUtils.countAndSort(authors);

    return result.toArray();
  }

  public sortTagsByCountDesc(books: Book[]): string[] {
    const tags = _(books)
      .where(item => !!item.tags?.length)
      .selectMany(item => item.tags);
    const result = BookSortUtils.countAndSort(tags);

    return result.toArray();
  }

  public async sortAuthorsByCountDesc$(books: Book[]): Promise<string[]> {
    const authors = _(books)
      .where(item => item.authors?.length)
      .selectMany(item => item.authors)
      .toArray();

    const counted = await BookSortUtils.stringCount(authors, 75);

    const sorted = _(Array.from(counted.entries()))
      .orderByDescending(item => item[1])
      .thenBy(item => item[0])
      .select(item => item[0]);

    return sorted.toArray();
  }

  public async sortTagsByCountDesc$(books: Book[]): Promise<string[]> {
    const tags = _(books)
      .where(item => !!item.tags?.length)
      .selectMany(item => item.tags)
      .where(item => Boolean(item))
      .toArray();

    const counted = await BookSortUtils.stringCount(tags, 75);

    const sorted = _(Array.from(counted.entries()))
      .orderByDescending(item => item[1])
      .thenBy(item => item[0])
      .select(item => item[0]);

    return sorted.toArray();
  }

  private static stringCount(data: string[], maxLength: number, result = new Map<string, number>()): Promise<Map<string, number>> {
    return new Promise(resolve => {
      if (data.length == 0) {
        resolve(result);
      }

      const searchable = data.slice(0, maxLength - 1);

      searchable.forEach(item => {
        const key = item.trim().toLowerCase();

        const count = result.get(key) ?? 0;
        result.set(key, count + 1);
      });

      const nextData = data.slice(maxLength);

      setTimeout(() => this.stringCount(nextData, maxLength, result).then(resolve));
    });
  }

  public sortBooksByFinishDate(books: Book[]): Book[] {
    return _(books)
      .orderByDescending(item => item.finished.year || -1)
      .thenByDescending(item => item.finished.month || -1)
      .thenByDescending(item => item.finished.day || -1)
      .thenByDescending(item => +item.modifyDate || -1)
      .thenByDescending(item => +item.createDate || -1)
      .toArray();
  }
}
