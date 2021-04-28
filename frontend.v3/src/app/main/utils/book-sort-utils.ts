import { Book } from '../../modules/book/models/book';
import _ from 'declarray';
import { ISequence } from 'declarray/lib/interfaces/i-sequence';
import { IGroupedData } from 'declarray/lib/interfaces/i-grouped-data';
import { StringComparer } from './string.comparer';
import { IEntity } from '../models/i-entity';
import { Entity } from '../models/entity';

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
      new StringComparer(),
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
    const result = entities.orderByDescending(item => item.modifyDate).thenByDescending(item => item.createDate);

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
