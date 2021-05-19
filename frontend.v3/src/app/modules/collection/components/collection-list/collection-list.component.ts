import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import { Collection } from '../../models/collection';
import _, { ISequence } from 'declarray';
import { BookSortUtils } from '../../../../main/utils/book-sort-utils';
import { CollectionInfo } from '../../models/collection-info';
import { SearchableList } from '../../../../main/utils/searchable-list';
import { SearchService } from '../../../search/services/search.service';
import { FuzzySearch } from '../../../../main/utils/fuzzy-search';

interface BookCollection {
  collection: Collection;
  booksForCollection: ISequence<Book>;
}

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
})
export class CollectionListComponent extends SearchableList implements OnInit {
  public collections$: Observable<CollectionInfo[]>;

  constructor(private activatedRoute: ActivatedRoute, searchService: SearchService) {
    super(searchService);

    const routeCollections: Observable<CollectionInfo[]> = activatedRoute.data.pipe(
      map(data => {
        const books = data.books as Book[];
        const collections = data.collections as Collection[];

        const counted = this.countBooksForCollection(books, collections);

        const missing = this.findCollectionsWithoutBooks(books, collections, counted);

        const result = missing.concat(counted).select(item => new CollectionInfo(item.collection, item.booksForCollection.count()));

        return this.sortCollection(result);
      }),
    );

    this.collections$ = combineLatest([routeCollections, this.filter$]).pipe(
      map(([collections, filter]) => new FuzzySearch().search(collections, filter)),
    );
  }

  public countBooksForCollection(books: Book[], collections: Collection[]): ISequence<BookCollection> {
    const distinctBooks = _(books)
      .where(item => item.rereadingBookGuid == null)
      .toArray();

    return _(collections).groupJoin(
      distinctBooks,
      collection => collection.guid,
      book => book.collectionGuid,
      (collection, booksForCollection) => ({
        collection,
        booksForCollection,
      }),
    );
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
        booksForCollection: _.empty() as ISequence<Book>,
      }));
  }

  public sortCollection(collections: ISequence<CollectionInfo>): CollectionInfo[] {
    return BookSortUtils.sortEntitiesByUsageTimeDesc(collections).toArray();
  }

  ngOnInit(): void {}
}
