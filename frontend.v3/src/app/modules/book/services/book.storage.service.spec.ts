import { TestBed } from '@angular/core/testing';
import { IndexedDbService } from '../../../main/services/indexed-db.service';

import { BookStorageService } from './book.storage.service';
import { UserService } from '../../user/services/user.service';

describe('BookStorageService', () => {
  let service: BookStorageService;

  const dbName = 'bookolog.db';
  const booksStore = 'BooksStore';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: IndexedDbService,
          useValue: {}
        },
        { provide: UserService, useValue: { user: { login: '' } } }
      ]
    });
    service = TestBed.inject(BookStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', async () => {
    const iDB = TestBed.inject(IndexedDbService);

    const spyAll = jasmine.createSpy();

    const values = [ 1, 2, 3 ];
    spyAll.and.resolveTo({
      target: {
        result: values
      }
    });

    iDB.open = jasmine.createSpy();
    iDB.close = jasmine.createSpy();
    iDB.all = spyAll;

    const result: any = await service.getAll();

    expect(iDB.all).toHaveBeenCalledTimes(1);
    expect(iDB.all).toHaveBeenCalledWith(booksStore);
    expect(result).toEqual(values);

    expect(iDB.open).toHaveBeenCalledTimes(1);
    expect(iDB.open).toHaveBeenCalledWith(dbName);

    expect(iDB.close).toHaveBeenCalledTimes(1);
  });

  it('saveMany', async () => {
    const iDB = TestBed.inject(IndexedDbService);

    iDB.open = jasmine.createSpy();
    iDB.close = jasmine.createSpy();
    iDB.saveMany = jasmine.createSpy();

    const values: any = [ {}, {}, {} ];

    await service.saveMany(values);

    values.forEach((item: any) => {
      expect(item.guid).toBeTruthy();
    });

    expect(iDB.saveMany).toHaveBeenCalledTimes(1);
    expect(iDB.saveMany).toHaveBeenCalledWith(booksStore, values);

    expect(iDB.open).toHaveBeenCalledTimes(1);
    expect(iDB.open).toHaveBeenCalledWith(dbName);

    expect(iDB.close).toHaveBeenCalledTimes(1);
  });

  it('clear', async () => {
    const iDB = TestBed.inject(IndexedDbService);

    iDB.open = jasmine.createSpy();
    iDB.close = jasmine.createSpy();
    iDB.clear = jasmine.createSpy();

    await service.clear();

    expect(iDB.clear).toHaveBeenCalledTimes(1);

    expect(iDB.open).toHaveBeenCalledTimes(1);
    expect(iDB.open).toHaveBeenCalledWith(dbName);

    expect(iDB.close).toHaveBeenCalledTimes(1);
  });

  it('restore', async () => {
    const booksService: any = service;

    const values: any = [ 1, 2, 3 ];

    booksService.clear = jasmine.createSpy();
    booksService.saveMany = jasmine.createSpy();

    await service.restore(values);

    expect(booksService.saveMany).toHaveBeenCalledTimes(1);
    expect(booksService.saveMany).toHaveBeenCalledWith(values);

    expect(booksService.clear).toHaveBeenCalledTimes(1);
  });
});
