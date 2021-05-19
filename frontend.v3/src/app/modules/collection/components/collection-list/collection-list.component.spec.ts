import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { Collection } from '../../models/collection';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import _ from 'declarray';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              books: [],
              collections: [],
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('countBooksForCollection', () => {
    const books = [
      new Book({
        collectionGuid: 'id1',
      } as any),
      new Book({
        collectionGuid: 'id2',
      } as any),
      new Book({
        collectionGuid: 'id2',
      } as any),
      new Book({} as any),
    ];

    const collections = [
      new Collection({
        guid: 'id1',
      } as any),
      new Collection({
        guid: 'id2',
      } as any),
    ];

    const result = component
      .countBooksForCollection(books, collections)
      .select(item => ({
        id: item.collection.guid,
        count: item.booksForCollection.count(),
      }))
      .toArray();

    expect(result).toEqual([
      {
        id: 'id1',
        count: 1,
      },
      {
        id: 'id2',
        count: 2,
      },
    ]);
  });

  it('findCollectionsWithoutBooks', () => {
    const books = [
      new Book({
        collectionGuid: 'id1',
      } as any),
      new Book({
        collectionGuid: 'id2',
      } as any),
      new Book({
        collectionGuid: 'id2',
      } as any),
      new Book({} as any),
    ];

    const collections = [
      new Collection({
        guid: 'id1',
      } as any),
      new Collection({
        guid: 'id2',
      } as any),
      new Collection({
        guid: 'id3',
      } as any),
    ];

    const counted = component.countBooksForCollection(books, collections);

    const empty = component
      .findCollectionsWithoutBooks(books, collections, counted)
      .select(item => ({
        id: item.collection.guid,
        count: item.booksForCollection.count(),
      }))
      .toArray();

    expect(empty).toEqual([
      {
        id: 'id3',
        count: 0,
      },
    ]);
  });

  it('sortCollection', () => {
    const result = component
      .sortCollection(
        _([
          {
            guid: 'id3',
            count: 3,
            modifyDate: new Date(2021, 1, 1),
          },
          {
            guid: 'id2',
            count: 4,
            modifyDate: new Date(2021, 0, 1),
          },
          {
            guid: 'id5',
            count: 0,
            createDate: new Date(2021, 1, 1),
          },
        ] as any),
      )
      .map(item => item.guid);

    expect(result).toEqual(['id3', 'id2', 'id5']);
  });
});
