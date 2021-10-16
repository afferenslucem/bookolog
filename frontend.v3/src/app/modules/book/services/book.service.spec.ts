import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import { BookOriginService } from './book.origin.service';

import { BookService } from './book.service';
import { BookStorageService } from './book.storage.service';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';
import { ProgressAlgorithmType } from '../models/progress-algorithm-type';
import { BrokenConnectionError } from '../../../main/models/errors/broken-connection-error';

describe('BookService', () => {
  let bookService: BookService;
  let bookOrigin: BookOriginService;
  let bookStorage: BookStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStorageService, BookOriginService, { provide: UUIDGeneratorService, useValue: {} }],
      imports: [HttpClientTestingModule],
    });
    bookService = TestBed.inject(BookService);
    bookOrigin = TestBed.inject(BookOriginService);
    bookStorage = TestBed.inject(BookStorageService);
  });

  it('should be created', () => {
    expect(bookService).toBeTruthy();
  });

  describe('saveOrUpdate', () => {
    it('should update book', async () => {
      const updateSpy = spyOn(bookService, 'update').and.resolveTo();
      const saveSpy = spyOn(bookService, 'save').and.resolveTo();

      const book: Book = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await bookService.saveOrUpdate(book);

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(0);
    });

    it('should save book', async () => {
      const updateSpy = spyOn(bookService, 'update').and.resolveTo();
      const saveSpy = spyOn(bookService, 'save').and.resolveTo();

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await bookService.saveOrUpdate(book);

      expect(updateSpy).toHaveBeenCalledTimes(0);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('should save to origin and storage', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      const dto = bookService.convertToDTO(book);
      const originBook = Object.assign({}, dto);
      originBook.guid = 'guid1';

      const saveSpy = spyOn(storage, 'save').and.resolveTo(originBook);
      const createSpy = spyOn(origin, 'create').and.resolveTo(originBook);

      await bookService.save(book);

      expect(createSpy).toHaveBeenCalledOnceWith(dto);
      expect(saveSpy).toHaveBeenCalledOnceWith(originBook);
    });

    it('should only to storage', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      const dto = bookService.convertToDTO(book);

      const createSpy = spyOn(origin, 'create').and.rejectWith(new BrokenConnectionError());
      const saveSpy = spyOn(storage, 'save').and.resolveTo(dto);

      await bookService.save(book);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledOnceWith({
        ...dto,
        shouldSync: 1,
      });
    });
  });

  describe('update', () => {
    it('should update to origin and storage', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      const dto = bookService.convertToDTO(book);
      const originBook = Object.assign({}, dto);
      originBook.guid = 'guid1';

      const originUpdateSpy = spyOn(storage, 'update').and.resolveTo(originBook);
      const storageUpdateSpy = spyOn(origin, 'update').and.resolveTo(originBook);

      await bookService.update(book);

      expect(storageUpdateSpy).toHaveBeenCalledOnceWith(dto);
      expect(originUpdateSpy).toHaveBeenCalledOnceWith(originBook);
    });

    it('should only to storage', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      const dto = bookService.convertToDTO(book);

      const originUpdateSpy = spyOn(storage, 'update').and.resolveTo(dto);
      const storageUpdateSpy = spyOn(origin, 'update').and.rejectWith(new BrokenConnectionError());

      await bookService.update(book);

      expect(originUpdateSpy).toHaveBeenCalledTimes(1);
      expect(storageUpdateSpy).toHaveBeenCalledOnceWith({
        ...dto,
        shouldSync: 1,
      });
    });
  });

  describe('getByGuid', () => {
    it('Get by guid', async () => {
      const storage = TestBed.inject(BookStorageService);

      const data: BookData = {
        guid: 'guid',
        name: 'name',
        status: 1,
        type: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
        progressType: ProgressAlgorithmType.Done,
      };

      const getByGuidSpy = spyOn(storage, 'getByGuid').and.resolveTo(data);

      const result = await bookService.getByGuid('guid');

      expect(result).toEqual(
        new Book({
          guid: 'guid',
          name: 'name',
          status: 1,
          type: 1,
          modifyDate: '2020-11-18 10:57',
          createDate: '2020-11-18 09:57',
          progressType: ProgressAlgorithmType.Done,
        }),
      );

      expect(getByGuidSpy).toHaveBeenCalledWith('guid');
      expect(getByGuidSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByStatus', () => {
    it('Get by status', async () => {
      const storage = TestBed.inject(BookStorageService);

      const data: BookData[] = [
        {
          guid: 'guid1',
          name: 'name1',
          status: 1,
          type: 1,
          modifyDate: '2020-11-18 10:57',
          createDate: '2020-11-18 09:57',
          progressType: ProgressAlgorithmType.Done,
        },
        {
          guid: 'guid2',
          name: 'name2',
          status: 1,
          type: 1,
          deleted: 1,
          modifyDate: '2020-11-18 10:57',
          createDate: '2020-11-18 09:57',
          progressType: ProgressAlgorithmType.Done,
        },
      ];

      const getByGuidSpy = spyOn(storage, 'getAllByStatus').and.resolveTo(data);

      const result = await bookService.getByStatus(BookStatus.InProgress);

      expect(result).toEqual([
        new Book({
          guid: 'guid1',
          name: 'name1',
          status: 1,
          type: 1,
          modifyDate: '2020-11-18 10:57',
          createDate: '2020-11-18 09:57',
          progressType: ProgressAlgorithmType.Done,
        }),
      ]);

      expect(getByGuidSpy).toHaveBeenCalledWith(BookStatus.InProgress);
      expect(getByGuidSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('Full delete', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const dto = bookService.convertToDTO(book);

      const storageRereadingsSpy = spyOn(storage, 'getAllRereadings').and.resolveTo();
      const saveOrUpdateManySpy = spyOn(bookService, 'saveOrUpdateMany').and.resolveTo();

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.resolveTo();

      await bookService.delete(book);

      expect(storageDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(storageDeleteSpy).toHaveBeenCalledTimes(1);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

      expect(storageRereadingsSpy).toHaveBeenCalledWith(dto.guid);
      expect(storageRereadingsSpy).toHaveBeenCalledTimes(1);
    });

    it('Soft delete', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const book: Book = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const dto = bookService.convertToDTO(book);

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const storageRereadingsSpy = spyOn(storage, 'getAllRereadings').and.resolveTo();
      const softDeleteSpy = spyOn(bookService, 'softDelete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.rejectWith();

      let error = null;

      try {
        await bookService.delete(book);
      } catch (e) {
        error = e;
      }

      expect(storageDeleteSpy).toHaveBeenCalledTimes(0);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

      expect(storageRereadingsSpy).toHaveBeenCalledWith(dto.guid);
      expect(storageRereadingsSpy).toHaveBeenCalledTimes(1);

      expect(softDeleteSpy).toHaveBeenCalledTimes(1);
    });

    it('Soft delete after origin failure', async () => {
      const storage = TestBed.inject(BookStorageService);

      const book: Book = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const dto = bookService.convertToDTO(book);
      dto.deleted = 1;

      const storageUpdateSpy = spyOn(storage, 'update').and.resolveTo();

      await bookService.softDelete(book);

      expect(storageUpdateSpy).toHaveBeenCalledTimes(1);
      expect(storageUpdateSpy).toHaveBeenCalledWith(dto);
    });
  });

  it('changeRereadingHierarchy', () => {
    const guid1 = 'guid1';
    const guid2 = 'guid2';
    const guid3 = 'guid3';

    const book1 = {
      guid: guid2,
      rereadingBookGuid: guid1,
      endDateYear: 2020,
    } as BookData;

    const book2 = {
      guid: guid3,
      rereadingBookGuid: guid2,
      endDateYear: 2021,
    } as BookData;

    const result = bookService.changeRereadingHierarchy([book1, book2]);

    expect(result[0].rereadingBookGuid).toBeFalsy();
    expect(result[1].rereadingBookGuid).toEqual(book1.guid);
  });

  it('getCountByStatus', async () => {
    const storage = TestBed.inject(BookStorageService);
    const storageUpdateSpy = spyOn(storage, 'countByStatus').and.resolveTo(7);

    const count = await storage.countByStatus(BookStatus.Done);

    expect(count).toEqual(7);
    expect(storageUpdateSpy).toHaveBeenCalledOnceWith(BookStatus.Done);
  });

  it('getAll', async () => {
    const getAllSpy = spyOn(bookStorage, 'getAll').and.resolveTo([
      {
        name: 'name1',
        guid: 'id1',
      },
      {
        name: 'name2',
        guid: 'id2',
      },
    ] as any);

    const result = await bookService.getAll();

    const expected = [
      new Book({
        name: 'name1',
        guid: 'id1',
        progressType: ProgressAlgorithmType.Done,
      } as any),
      new Book({
        name: 'name2',
        guid: 'id2',
        progressType: ProgressAlgorithmType.Done,
      } as any),
    ] as any;

    expect(result).toEqual(expected);
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('getByGuid', async () => {
    const getByGuidSpy = spyOn(bookStorage, 'getByGuid').and.resolveTo({
      name: 'name1',
      guid: 'id1',
    } as any);

    const result = await bookService.getByGuid('id1');

    const expected = new Book({
      name: 'name1',
      guid: 'id1',
      progressType: ProgressAlgorithmType.Done,
    } as any);

    expect(result).toEqual(expected);
    expect(getByGuidSpy).toHaveBeenCalledTimes(1);
  });

  it('getAllCount', async () => {
    const getCountSpy = spyOn(bookStorage, 'count').and.resolveTo(7);
    const result = await bookService.getAllCount();

    expect(result).toEqual(7);
    expect(getCountSpy).toHaveBeenCalledTimes(1);
  });

  it('loadAll', async () => {
    const getAllSpy = spyOn(bookOrigin, 'getAll').and.resolveTo([
      {
        guid: 'id1',
      },
      {
        guid: 'id2',
      },
    ] as any);
    const restoreSpy = spyOn(bookStorage, 'restore');

    await bookService.loadAll();

    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(restoreSpy).toHaveBeenCalledOnceWith([
      {
        guid: 'id1',
      },
      {
        guid: 'id2',
      },
    ]);
  });

  it('restore', async () => {
    const clearSpy = spyOn(bookStorage, 'clear');
    const saveMany = spyOn(bookStorage, 'saveMany');

    await bookService.restore([
      {
        guid: 'id1',
      },
    ] as any);

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(saveMany).toHaveBeenCalledOnceWith([
      {
        guid: 'id1',
      },
    ] as any);
  });

  it('saveOrUpdateMany', async () => {
    const updateManySpy = spyOn(bookStorage, 'updateMany');
    const saveManySpy = spyOn(bookStorage, 'saveMany');
    const entitiesSyncSpy = spyOn(bookService, 'entitiesSync');

    const newBook = new Book({
      name: 'name1',
    } as any);

    const oldBook = new Book({
      name: 'name2',
      guid: 'id2',
    } as any);

    await bookService.saveOrUpdateMany([newBook, oldBook]);

    expect(updateManySpy).toHaveBeenCalledOnceWith([bookService.convertToDTO(oldBook)]);
    expect(saveManySpy).toHaveBeenCalledOnceWith([bookService.convertToDTO(newBook)]);
    expect(entitiesSyncSpy).toHaveBeenCalledTimes(1);
  });

  it('deleteBooksFromCollection', async () => {
    const seriesSpy = spyOn(bookService, 'getByCollection').and.resolveTo([
      {
        collectionGuid: 'id1',
        collectionOrder: 0,
      },
      {
        collectionGuid: 'id1',
        collectionOrder: 1,
      },
      {
        collectionGuid: 'id1',
        collectionOrder: 2,
      },
    ] as any);
    const saveOrUpdateMany = spyOn(bookService, 'saveOrUpdateMany');

    await bookService.deleteBooksFromCollection('id1');

    expect(seriesSpy).toHaveBeenCalledOnceWith('id1');
    expect(saveOrUpdateMany).toHaveBeenCalledOnceWith([
      {
        collectionGuid: null,
        collectionOrder: null,
      },
      {
        collectionGuid: null,
        collectionOrder: null,
      },
      {
        collectionGuid: null,
        collectionOrder: null,
      },
    ]);
  });

  it('getByStatus', async () => {
    const byStatusSpy = spyOn(bookStorage, 'getAllByStatus').and.resolveTo([
      {
        name: 'name1',
        guid: 'id1',
        deleted: 1,
        status: BookStatus.Done,
      },
      {
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
      },
    ] as any);

    const done = await bookService.getByStatus(BookStatus.Done);

    expect(done).toEqual([
      new Book({
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
        progressType: 'Done',
      } as any),
    ]);

    expect(byStatusSpy).toHaveBeenCalledOnceWith(BookStatus.Done);
  });

  it('getAllByYear', async () => {
    const byYearSpy = spyOn(bookStorage, 'getAllByYear').and.resolveTo([
      {
        name: 'name1',
        guid: 'id1',
        deleted: 1,
        endDateYear: 1997,
      },
      {
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
        endDateYear: 1997,
      },
    ] as any);

    const done = await bookService.getByYear(1997);

    expect(done).toEqual([
      new Book({
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
        endDateYear: 1997,
      } as any),
    ]);

    expect(byYearSpy).toHaveBeenCalledOnceWith(1997);
  });

  it('getByCollection', async () => {
    const byCollectionSpy = spyOn(bookStorage, 'getAllByCollection').and.resolveTo([
      {
        name: 'name1',
        guid: 'id1',
        deleted: 1,
        collectionGuid: 'id1',
      },
      {
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
        collectionGuid: 'id1',
      },
    ] as any);

    const done = await bookService.getByCollection('id1');

    expect(done).toEqual([
      new Book({
        name: 'name2',
        guid: 'id2',
        status: BookStatus.Done,
        collectionGuid: 'id1',
      } as any),
    ]);

    expect(byCollectionSpy).toHaveBeenCalledOnceWith('id1');
  });

  describe('saveRereading', () => {
    it('shoold save sample rereading', async () => {
      const original = {
        rereadingBookGuid: undefined,
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const book = {
        guid: 'guid',
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const byGuidSpy = spyOn(bookService, 'getByGuid').and.resolveTo(original);
      const saveSpy = spyOn(bookService, 'save').and.resolveTo(book);
      const updateSpy = spyOn(bookService, 'update').and.resolveTo(book);

      await bookService.saveRereading(book);

      expect(byGuidSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(book);

      original.rereadedBy = ['guid'];
      original.rereadingBookGuid = undefined;
      original.guid = 'guid';

      expect(updateSpy).toHaveBeenCalledWith(original);
      expect(original.rereadedBy).toEqual([original.guid]);
    });

    it('should change rereading id', async () => {
      const original = {
        rereadingBookGuid: 'guid2',
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const book = {
        guid: 'guid',
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const byGuidSpy = spyOn(bookService, 'getByGuid').and.resolveTo(original);
      const saveSpy = spyOn(bookService, 'save').and.resolveTo(book);
      const originalSpy = spyOn(bookService, 'update').and.resolveTo(original);

      await bookService.saveRereading(book);

      expect(book.rereadingBookGuid).toEqual(original.rereadingBookGuid);
    });
  });

  describe('findFirstReadingOfBook', () => {
    it('should return first', async () => {
      const original = {
        rereadingBookGuid: undefined,
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const byGuidSpy = spyOn(bookService, 'getByGuid').and.resolveTo(original);

      // @ts-ignore
      const result = await bookService.findFirstReadingOfBook('guid');

      expect(result).toEqual(original);
      expect(byGuidSpy).toHaveBeenCalledTimes(1);
    });

    it('should return next', async () => {
      const book = {
        rereadingBookGuid: 'guid2',
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const original = {
        rereadingBookGuid: null,
        rereadedBy: [],
        modifyDate: null,
        createDate: null,
      } as Book;

      const byGuidSpy = spyOn(bookService, 'getByGuid').and.returnValues(Promise.resolve(book), Promise.resolve(original));

      // @ts-ignore
      const result = await bookService.findFirstReadingOfBook('guid');

      expect(result).toEqual(original);
      expect(byGuidSpy).toHaveBeenCalledWith('guid');
      expect(byGuidSpy).toHaveBeenCalledWith('guid2');
      expect(byGuidSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('getAllReadings', async () => {
    const first = {
      guid: 'guid',
    } as Book;

    const rereadings = [
      {
        guid: 'guid2',
      } as Book,
      {
        guid: 'guid3',
      } as Book,
    ] as Book[];

    // @ts-ignore
    const findFirstReadingOfBookSpy = spyOn(bookService, 'findFirstReadingOfBook').and.resolveTo(first);

    // @ts-ignore
    const findAllRereadingsOfBookSpy = spyOn(bookService, 'findAllRereadingsOfBook').and.resolveTo(rereadings);

    const result = await bookService.getAllReadings('guid2');

    expect(result).toEqual([first, ...rereadings]);
    expect(findFirstReadingOfBookSpy).toHaveBeenCalledOnceWith('guid2');
    expect(findAllRereadingsOfBookSpy).toHaveBeenCalledWith(first.guid);
  });
});
