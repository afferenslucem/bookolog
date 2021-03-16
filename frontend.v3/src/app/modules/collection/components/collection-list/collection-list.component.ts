import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISequence } from 'declarray/lib/interfaces/i-sequence';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';
import { Collection } from '../../models/collection';
import _ from 'declarray';

interface CollectionInfo {
  name: string;
  guid: string;
  shouldSync: number;
  count: number;
}

interface BookCollection {
  collection: Collection;
  booksForCollection: ISequence<Book>;
}

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent implements OnInit {
  public collections$: Observable<CollectionInfo[]>;

  constructor(private activatedRoute: ActivatedRoute, private titleService: TitleService) {
    this.collections$ = activatedRoute.data.pipe(
      map(data => {
        const books = data.books as Book[];
        const collections = data.collections as Collection[];

        const counted = this.countBooksForCollection(books, collections);

        const missing = this.findCollectionsWithoutBooks(books, collections, counted);

        const result = missing
          .concat(counted)
          .select(item => ({
            name: item.collection.name,
            guid: item.collection.guid,
            shouldSync: item.collection.shouldSync,
            count: item.booksForCollection.count(),
          }));

        return this.sortCollection(result).toArray();
      }),
    );
  }

  public countBooksForCollection(books: Book[], collections: Collection[]): ISequence<BookCollection> {
    const distinctBooks = _(books).where(item => item.rereadingBookGuid == null).toArray();

    return _(collections)
      .groupJoin(distinctBooks,
        collection => collection.guid,
        book => book.collectionGuid,
        (collection, booksForCollection) => ({
          collection,
          booksForCollection,
        }));
  }

  public findCollectionsWithoutBooks(
    books: Book[],
    collections: Collection[],
    counted: ISequence<BookCollection>,
  ): ISequence<BookCollection> {
    return _(collections)
      .except(counted.select(item => item.collection))
      .select(item => ({
        collection: item,
        booksForCollection: _.empty(),
      }));
  }

  public sortCollection(collections: ISequence<CollectionInfo>): ISequence<CollectionInfo> {
    return collections.orderByDescending(item => item.count).thenBy(item => item.name);
  }

  ngOnInit(): void {
    this.titleService.setCollectionList();
  }
}
