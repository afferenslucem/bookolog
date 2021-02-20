import { TestBed } from '@angular/core/testing';
import { IndexedDbService } from '../../../main/services/indexed-db.service';

import { BookStorageService } from './book.storage.service';
import { UserService } from '../../user/services/user.service';
import {BookStatus} from '../models/book-status';
import {UUIDGeneratorService} from '../../../main/services/u-u-i-d-generator.service';

describe('BookStorageService', () => {
  let service: BookStorageService;
  let indexedDbService: IndexedDbService;
  let uuidService: UUIDGeneratorService;

  const dbName = 'bookolog.db';
  const booksStore = 'BooksStore';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: { user: { login: '' } } }
      ]
    });
    service = TestBed.inject(BookStorageService);
    indexedDbService = TestBed.inject(IndexedDbService);
    uuidService = TestBed.inject(UUIDGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', async () => {
    const spyAll = jasmine.createSpy();

    const values = [ 1, 2, 3 ];
    spyAll.and.resolveTo({
      target: {
        result: values
      }
    });

    indexedDbService.open = jasmine.createSpy();
    indexedDbService.close = jasmine.createSpy();
    indexedDbService.all = spyAll;

    const result: any = await service.getAll();

    expect(indexedDbService.all).toHaveBeenCalledTimes(1);
    expect(indexedDbService.all).toHaveBeenCalledWith(booksStore);
    expect(result).toEqual(values);

    expect(indexedDbService.open).toHaveBeenCalledTimes(1);
    expect(indexedDbService.open).toHaveBeenCalledWith(dbName);

    expect(indexedDbService.close).toHaveBeenCalledTimes(1);
  });

  it('saveMany', async () => {
    indexedDbService.open = jasmine.createSpy();
    indexedDbService.close = jasmine.createSpy();
    indexedDbService.saveMany = jasmine.createSpy();

    const values: any = [ {}, {}, {} ];

    await service.saveMany(values);

    values.forEach((item: any) => {
      expect(item.guid).toBeTruthy();
    });

    expect(indexedDbService.saveMany).toHaveBeenCalledTimes(1);
    expect(indexedDbService.saveMany).toHaveBeenCalledWith(booksStore, values);

    expect(indexedDbService.open).toHaveBeenCalledTimes(1);
    expect(indexedDbService.open).toHaveBeenCalledWith(dbName);

    expect(indexedDbService.close).toHaveBeenCalledTimes(1);
  });

  it('clear', async () => {
    indexedDbService.open = jasmine.createSpy();
    indexedDbService.close = jasmine.createSpy();
    indexedDbService.clear = jasmine.createSpy();

    await service.clear();

    expect(indexedDbService.clear).toHaveBeenCalledTimes(1);

    expect(indexedDbService.open).toHaveBeenCalledTimes(1);
    expect(indexedDbService.open).toHaveBeenCalledWith(dbName);

    expect(indexedDbService.close).toHaveBeenCalledTimes(1);
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

  it('countByStatus', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const getCountSpy = spyOn(indexedDbService, 'getCount').and.resolveTo({
      target: {
        result: 7
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.countByStatus(BookStatus.Done);

    expect(result).toEqual(7);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(getCountSpy).toHaveBeenCalledOnceWith('BooksStore', 'status', BookStatus.Done);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('getAllByStatus', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const allWithPropertySpy = spyOn(indexedDbService, 'allWithProperty').and.resolveTo({
      target: {
        result: [{
          guid: 'id1'
        }, {
          guid: 'id2'
        }, ]
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.getAllByStatus(BookStatus.Done);

    expect(result).toEqual([{
      guid: 'id1'
    }, {
      guid: 'id2'
    }, ] as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(allWithPropertySpy).toHaveBeenCalledOnceWith('BooksStore', 'status', BookStatus.Done);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  describe('getAllByYear', () => {
    it('should search by property', async () => {
      const openSpy = spyOn(indexedDbService, 'open');

      const allWithPropertySpy = spyOn(indexedDbService, 'allWithProperty').and.resolveTo({
        target: {
          result: [{
            guid: 'id1'
          }, {
            guid: 'id2'
          }, ]
        }
      } as any);

      const closeSpy = spyOn(indexedDbService, 'close');

      const result = await service.getAllByYear(2007);

      expect(result).toEqual([ {
        guid: 'id1'
      }, {
        guid: 'id2'
      }, ] as any);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(allWithPropertySpy).toHaveBeenCalledOnceWith('BooksStore', 'endDateYear', 2007);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should search by null', async () => {
      const closeSpy = spyOn(indexedDbService, 'close');
      const getAll = spyOn(service, 'getAll').and.resolveTo([{
        endDateYear: 1997,
      }, {
        endDateYear: 1998,
      }, {
        endDateYear: null,
      }, {
      }] as any);

      const result = await service.getAllByYear(null);

      expect(result).toEqual([ {
        endDateYear: null,
      }, {
      }] as any);

      expect(getAll).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('getAllByCollection', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const allWithPropertySpy = spyOn(indexedDbService, 'allWithProperty').and.resolveTo({
      target: {
        result: [{
          guid: 'id1'
        }, {
          guid: 'id2'
        }, ]
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.getAllByCollection('id8');

    expect(result).toEqual([ {
      guid: 'id1'
    }, {
      guid: 'id2'
    }, ] as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(allWithPropertySpy).toHaveBeenCalledOnceWith('BooksStore', 'collectionGuid', 'id8');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('getDeleted', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const allWithPropertySpy = spyOn(indexedDbService, 'allWithProperty').and.resolveTo({
      target: {
        result: [{
          guid: 'id1'
        }, {
          guid: 'id2'
        }, ]
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.getDeleted();

    expect(result).toEqual([ {
      guid: 'id1'
    }, {
      guid: 'id2'
    }, ] as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(allWithPropertySpy).toHaveBeenCalledOnceWith('BooksStore', 'deleted', 1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('getShouldSync', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const allWithPropertySpy = spyOn(indexedDbService, 'allWithProperty').and.resolveTo({
      target: {
        result: [{
          guid: 'id1'
        }, {
          guid: 'id2'
        }, ]
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.getShouldSync();

    expect(result).toEqual([ {
      guid: 'id1'
    }, {
      guid: 'id2'
    }, ] as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(allWithPropertySpy).toHaveBeenCalledOnceWith('BooksStore', 'shouldSync', 1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('getByGuid', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const getByGuidSpy = spyOn(indexedDbService, 'get').and.resolveTo({
      target: {
        result: {
          guid: 'id1'
        }
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const result = await service.getByGuid('id1');

    expect(result).toEqual({
      guid: 'id1'
    } as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(getByGuidSpy).toHaveBeenCalledOnceWith('BooksStore', 'guid', 'id1');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('save', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const saveSpy = spyOn(indexedDbService, 'save').and.resolveTo({
      target: {
        result: {
          guid: 'id1'
        }
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');
    const generateSpy = spyOn(uuidService, 'generate').and.returnValue('id1');

    const result = await service.save({
      name: 'name1'
    } as any);

    expect(result).toEqual({
      guid: 'id1',
      name: 'name1'
    } as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(generateSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledOnceWith('BooksStore', {
      guid: 'id1',
      name: 'name1'
    });
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  describe('updateMany', () => {
    it('should updateMany', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const generateSpy = spyOn(uuidService, 'generate').and.returnValue('id1');

      const updateManySpy = spyOn(indexedDbService, 'updateMany').and.resolveTo({
        target: {
          result: [{
            guid: 'id1'
          }, {
            guid: 'id2'
          }, ]
        }
      } as any);

      const closeSpy = spyOn(indexedDbService, 'close');

      const result = await service.updateMany([{
        guid: 'id1'
      }, {
        guid: 'id2'
      }, ] as any);

      expect(result).toEqual([{
        guid: 'id1'
      }, {
        guid: 'id2'
      }, ] as any);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(updateManySpy).toHaveBeenCalledOnceWith('BooksStore', [{
        guid: 'id1'
      }, {
        guid: 'id2'
      }, ] as any);
      expect(generateSpy).toHaveBeenCalledTimes(0);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should skip', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const updateManySpy = spyOn(indexedDbService, 'updateMany');
      const closeSpy = spyOn(indexedDbService, 'close');

      const result = await service.updateMany([]);

      expect(result).toEqual([]);

      expect(openSpy).toHaveBeenCalledTimes(0);
      expect(updateManySpy).toHaveBeenCalledTimes(0);
      expect(closeSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('update', async () => {
    const openSpy = spyOn(indexedDbService, 'open');

    const updateSpy = spyOn(indexedDbService, 'update').and.resolveTo({
      target: {
        result: {
          guid: 'id1'
        }
      }
    } as any);

    const closeSpy = spyOn(indexedDbService, 'close');

    const generateSpy = spyOn(uuidService, 'generate').and.returnValue('id1');

    const result = await service.update({
      guid: 'id1',
      name: 'name1'
    } as any);

    expect(result).toEqual({
      guid: 'id1',
      name: 'name1'
    } as any);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(generateSpy).toHaveBeenCalledTimes(0);
    expect(updateSpy).toHaveBeenCalledOnceWith('BooksStore', {
      guid: 'id1',
      name: 'name1'
    });
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  describe('saveMany', () => {
    it('should saveMany', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const generateSpy = spyOn(uuidService, 'generate').and.returnValues('id1', 'id2');
      const saveManySpy = spyOn(indexedDbService, 'saveMany').and.resolveTo({
        target: {
          result: [{
            guid: 'id1',
            name: 'name1',
          }, {
            guid: 'id2',
            name: 'name2'
          }, ]
        }
      } as any);
      const closeSpy = spyOn(indexedDbService, 'close');

      const result = await service.saveMany([{
        name: 'name1',
      }, {
        name: 'name2'
      }, ] as any);

      expect(result).toEqual([{
        guid: 'id1',
        name: 'name1',
      }, {
        guid: 'id2',
        name: 'name2'
      }, ] as any);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(saveManySpy).toHaveBeenCalledOnceWith('BooksStore', [{
        guid: 'id1',
        name: 'name1',
      }, {
        guid: 'id2',
        name: 'name2'
      }, ] as any);
      expect(closeSpy).toHaveBeenCalledTimes(1);
      expect(generateSpy).toHaveBeenCalledTimes(2);
    });

    it('should skip', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const generateSpy = spyOn(uuidService, 'generate').and.returnValues('id1', 'id2');
      const saveManySpy = spyOn(indexedDbService, 'saveMany');
      const closeSpy = spyOn(indexedDbService, 'close');

      const result = await service.saveMany([]);

      expect(result).toEqual([]);

      expect(openSpy).toHaveBeenCalledTimes(0);
      expect(saveManySpy).toHaveBeenCalledTimes(0);
      expect(closeSpy).toHaveBeenCalledTimes(0);
      expect(generateSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteMany', () => {
    it('should deleteMany', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const deleteManySpy = spyOn(indexedDbService, 'deleteMany').and.resolveTo();
      const closeSpy = spyOn(indexedDbService, 'close');

      await service.deleteMany(['id1', 'id2']);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(deleteManySpy).toHaveBeenCalledOnceWith('BooksStore', ['id1', 'id2']);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should skip', async () => {
      const openSpy = spyOn(indexedDbService, 'open');
      const deleteManySpy = spyOn(indexedDbService, 'deleteMany').and.resolveTo();
      const closeSpy = spyOn(indexedDbService, 'close');

      await service.deleteMany([]);

      expect(openSpy).toHaveBeenCalledTimes(0);
      expect(deleteManySpy).toHaveBeenCalledTimes(0);
      expect(closeSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('delete', async () => {
    const openSpy = spyOn(indexedDbService, 'open');
    const deleteSpy = spyOn(indexedDbService, 'delete').and.resolveTo();
    const closeSpy = spyOn(indexedDbService, 'close');

    await service.delete('id1');

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledOnceWith('BooksStore', 'id1');
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});
