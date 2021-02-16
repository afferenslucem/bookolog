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

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookStorageService,
        BookOriginService,
        { provide: UUIDGeneratorService, useValue: {} }
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveOrUpdate', () => {
    it('should update book', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(origin, 'sync').and.resolveTo();

      const book: Book = {
        guid: 'guid',
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await service.saveOrUpdate(book);

      expect(updateSpy).toHaveBeenCalledWith(service.convertToDTO(book));
      expect(updateSpy).toHaveBeenCalledTimes(1);

      expect(saveSpy).toHaveBeenCalledTimes(0);

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });

    it('should save book', async () => {
      const storage = TestBed.inject(BookStorageService);
      const origin = TestBed.inject(BookOriginService);

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(origin, 'sync').and.resolveTo();

      const book: Book = {
        name: 'name',
        type: 1,
        status: 1,
        modifyDate: '2020-11-18 10:57:00',
        createDate: '2020-11-18 10:57:00',
      } as any;

      await service.saveOrUpdate(book);

      expect(saveSpy).toHaveBeenCalledWith(service.convertToDTO(book));
      expect(saveSpy).toHaveBeenCalledTimes(1);

      expect(updateSpy).toHaveBeenCalledTimes(0);
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

      const result = await service.getByGuid('guid');

      expect(result).toEqual(new Book({
        guid: 'guid',
        name: 'name',
        status: 1,
        type: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
        progressType: ProgressAlgorithmType.Done,
      }));

      expect(getByGuidSpy).toHaveBeenCalledWith('guid');
      expect(getByGuidSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByStatus', () => {
    it('Get by status', async () => {
      const storage = TestBed.inject(BookStorageService);

      const data: BookData[] = [ {
        guid: 'guid1',
        name: 'name1',
        status: 1,
        type: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
        progressType: ProgressAlgorithmType.Done,
      }, {
        guid: 'guid2',
        name: 'name2',
        status: 1,
        type: 1,
        deleted: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
        progressType: ProgressAlgorithmType.Done,
      } ];

      const getByGuidSpy = spyOn(storage, 'getAllByStatus').and.resolveTo(data);

      const result = await service.getByStatus(BookStatus.InProgress);

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

      const dto = service.convertToDTO(book);

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const softDeleteSpy = spyOn(service, 'softDelete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.resolveTo();

      await service.delete(book);

      expect(storageDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(storageDeleteSpy).toHaveBeenCalledTimes(1);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

      expect(softDeleteSpy).toHaveBeenCalledTimes(0);
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

      const dto = service.convertToDTO(book);

      const storageDeleteSpy = spyOn(storage, 'delete').and.resolveTo();
      const softDeleteSpy = spyOn(service, 'softDelete').and.resolveTo();
      const originDeleteSpy = spyOn(origin, 'delete').and.rejectWith();

      await service.delete(book);

      expect(storageDeleteSpy).toHaveBeenCalledTimes(0);

      expect(originDeleteSpy).toHaveBeenCalledWith(dto.guid);
      expect(originDeleteSpy).toHaveBeenCalledTimes(1);

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

      const dto = service.convertToDTO(book);
      dto.deleted = 1;

      const storageUpdateSpy = spyOn(storage, 'update').and.resolveTo();

      await service.softDelete(book);

      expect(storageUpdateSpy).toHaveBeenCalledTimes(1);
      expect(storageUpdateSpy).toHaveBeenCalledWith(dto);
    });
  });
});
