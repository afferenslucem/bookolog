import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CollectionData } from '../models/collection-data';
import { ProgressAlgorithmType } from '../../book/models/progress-algorithm-type';
import { CollectionService } from './collection.service';
import { CollectionStorageService } from './collection.storage.service';
import { CollectionOriginService } from './collection.origin.service';
import { Collection } from '../models/collection';
import { UUIDGeneratorService } from '../../../main/services/u-u-i-d-generator.service';

describe('CollectionService', () => {
  let collectionService: CollectionService;
  let collectionOrigin: CollectionOriginService;
  let collectionStorage: CollectionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionStorageService,
        CollectionOriginService,
        { provide: UUIDGeneratorService, useValue: {} }
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
    collectionService = TestBed.inject(CollectionService);
    collectionOrigin = TestBed.inject(CollectionOriginService);
    collectionStorage = TestBed.inject(CollectionStorageService);
  });

  it('should be created', () => {
    expect(collectionService).toBeTruthy();
  });

  describe('saveOrUpdate', () => {
    it('should update collection', async () => {
      const storage = TestBed.inject(CollectionStorageService);
      const origin = TestBed.inject(CollectionOriginService);

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(origin, 'sync').and.resolveTo();

      const collection: Collection = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await collectionService.saveOrUpdate(collection);

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(0);

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });

    it('should save collection', async () => {
      const storage = TestBed.inject(CollectionStorageService);
      const origin = TestBed.inject(CollectionOriginService);

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(origin, 'sync').and.resolveTo();

      const collection: Collection = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await collectionService.saveOrUpdate(collection);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(0);

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByGuid', () => {
    it('Get by guid', async () => {
      const storage = TestBed.inject(CollectionStorageService);

      const data: CollectionData = {
        guid: 'guid',
        name: 'name',
        description: 'description',
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
      };

      const getByGuidSpy = spyOn(storage, 'getByGuid').and.resolveTo(data);

      const result = await collectionService.getByGuid('guid');

      expect(result).toEqual(new Collection({
        guid: 'guid',
        name: 'name',
        description: 'description',
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
      } as any));

      expect(getByGuidSpy).toHaveBeenCalledWith('guid');
      expect(getByGuidSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('Full delete', async () => {
      const storage = TestBed.inject(CollectionStorageService);
      const origin = TestBed.inject(CollectionOriginService);

      const collection: Collection = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const dto = collectionService.convertToDTO(collection);

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const softDeleteSpy = spyOn(collectionService, 'softDelete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.resolveTo();
      const syncSpy = spyOn(collectionService, 'entitiesSync').and.resolveTo();

      await collectionService.delete(collection);

      expect(storageDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(storageDeleteSpy).toHaveBeenCalledTimes(1);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

      expect(syncSpy).toHaveBeenCalledTimes(1);

      expect(softDeleteSpy).toHaveBeenCalledTimes(0);
    });

    it('Soft delete', async () => {
      const storage = TestBed.inject(CollectionStorageService);
      const origin = TestBed.inject(CollectionOriginService);

      const collection: Collection = {
        guid: 'guid',
        name: 'name',
        description: 'description',
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      const dto = collectionService.convertToDTO(collection);

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const softDeleteSpy = spyOn(collectionService, 'softDelete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.rejectWith();

      await collectionService.delete(collection);

      expect(storageDeleteSpy).toHaveBeenCalledTimes(0);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

      expect(softDeleteSpy).toHaveBeenCalledTimes(1);
    });

    it('Soft delete after origin failure', async () => {
      const storage = TestBed.inject(CollectionStorageService);

      const collection: Collection = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const dto = collectionService.convertToDTO(collection);
      dto.deleted = 1;

      const storageUpdateSpy = spyOn(storage, 'update').and.resolveTo();

      await collectionService.softDelete(collection);

      expect(storageUpdateSpy).toHaveBeenCalledTimes(1);
      expect(storageUpdateSpy).toHaveBeenCalledWith(dto);
    });
  });

  it('getAll', async () => {
    const getAllSpy = spyOn(collectionStorage, 'getAll').and.resolveTo([{
      name: 'name1',
      description: 'description',
      guid: 'id1'
    }, {
      name: 'name2',
      description: 'description',
      guid: 'id2'
    }, ] as any);

    const result = await collectionService.getAll();

    const expected = [
      new Collection({
        name: 'name1',
        description: 'description',
        guid: 'id1',
        progressType: ProgressAlgorithmType.Done,
      } as any),
      new Collection({
        name: 'name2',
        description: 'description',
        guid: 'id2',
        progressType: ProgressAlgorithmType.Done,
      } as any),
    ] as any;

    expect(result).toEqual(expected);
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('getByGuid', async () => {
    const getByGuidSpy = spyOn(collectionStorage, 'getByGuid').and.resolveTo({
      name: 'name1',
      guid: 'id1'
    } as any);

    const result = await collectionService.getByGuid('id1');

    const expected = new Collection({
      name: 'name1',
      guid: 'id1',
      progressType: ProgressAlgorithmType.Done,
    } as any);

    expect(result).toEqual(expected);
    expect(getByGuidSpy).toHaveBeenCalledTimes(1);
  });

  it('getAllCount', async () => {
    const getCountSpy = spyOn(collectionStorage, 'count').and.resolveTo(7);
    const result = await collectionService.getAllCount();

    expect(result).toEqual(7);
    expect(getCountSpy).toHaveBeenCalledTimes(1);
  });

  it('loadAll', async () => {
    const getAllSpy = spyOn(collectionOrigin, 'getAll').and.resolveTo([{
      guid: 'id1'
    }, {
      guid: 'id2'
    }] as any);
    const restoreSpy = spyOn(collectionStorage, 'restore');

    await collectionService.loadAll();

    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(restoreSpy).toHaveBeenCalledOnceWith([{
      guid: 'id1'
    }, {
      guid: 'id2'
    }]);
  });

  it('restore', async () => {
    const clearSpy = spyOn(collectionStorage, 'clear');
    const saveMany = spyOn(collectionStorage, 'saveMany');

    await collectionService.restore([{
      guid: 'id1',
    }] as any);

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(saveMany).toHaveBeenCalledOnceWith([{
      guid: 'id1',
    }] as any);
  });

  describe('saveOrUpdate', async () => {
    it('should update', async () => {
      const storage = TestBed.inject(CollectionStorageService);

      const saveSpy = spyOn(storage, 'save');
      const updateSpy = spyOn(storage, 'update');
      const syncSpy = spyOn(collectionService, 'entitiesSync');

      const collection: Collection = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: null,
        createDate: null,
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const result = await collectionService.saveOrUpdate(collection);

      const expected = new Collection({
        ...collection,
        shouldSync: 1,
      } as any);

      expected.modifyDate = jasmine.any(Date) as any;
      expected.createDate = jasmine.any(Date) as any;

      expect(result).toEqual(expected);

      const dto = collectionService.convertToDTO(collection);
      dto.shouldSync = 1;

      expect(saveSpy).toHaveBeenCalledTimes(0);
      expect(syncSpy).toHaveBeenCalledTimes(1);
    });

    it('should save', async () => {
      const storage = TestBed.inject(CollectionStorageService);

      const saveSpy = spyOn(storage, 'save');
      const updateSpy = spyOn(storage, 'update');
      const syncSpy = spyOn(collectionService, 'entitiesSync');

      const collection: Collection = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: null,
        createDate: null,
        progressType: ProgressAlgorithmType.Done,
      } as any;

      const result = await collectionService.saveOrUpdate(collection);

      const expected = new Collection({
        ...collection,
        shouldSync: 1,
      } as any);

      expected.modifyDate = jasmine.any(Date) as any;
      expected.createDate = jasmine.any(Date) as any;

      expect(result).toEqual(expected);

      const dto = collectionService.convertToDTO(collection);
      dto.shouldSync = 1;

      expect(updateSpy).toHaveBeenCalledTimes(0);
      expect(syncSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('saveOrUpdateMany', async () => {
    const updateManySpy = spyOn(collectionStorage, 'updateMany');
    const saveManySpy = spyOn(collectionStorage, 'saveMany');
    const entitiesSyncSpy = spyOn(collectionService, 'entitiesSync');

    const newCollection = new Collection({
      name: 'name1',
    } as any);

    const oldCollection = new Collection({
      name: 'name2',
      guid: 'id2',
    } as any);

    await collectionService.saveOrUpdateMany([newCollection, oldCollection]);

    expect(updateManySpy).toHaveBeenCalledTimes(1);
    expect(saveManySpy).toHaveBeenCalledTimes(1);
    expect(entitiesSyncSpy).toHaveBeenCalledTimes(1);
  });
});
