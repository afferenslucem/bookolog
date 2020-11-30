import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book';
import { BookData } from '../models/book-data';
import { BookStatus } from '../models/book-status';
import { BookType } from '../models/book-type';
import { BookOriginService } from './book.origin.service';

import { BookService } from './book.service';
import { BookStorageService } from './book.storage.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookStorageService, BookOriginService],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveOrUpdate', () => {
    it('should update book', async () => {
      const storage = TestBed.inject(BookStorageService);

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(service, 'sync').and.resolveTo();

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

      const updateSpy = spyOn(storage, 'update').and.resolveTo();
      const saveSpy = spyOn(storage, 'save').and.resolveTo();
      const syncSpy = spyOn(service, 'sync').and.resolveTo();

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

      expect(syncSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveOrUpdate', () => {
    it('Get by guid',  async () => {
      const storage = TestBed.inject(BookStorageService);

      const data: BookData = {
        guid: 'guid',
        name: 'name',
        status: 1,
        type: 1,
        modifyDate: '2020-11-18 10:57',
        createDate: '2020-11-18 09:57',
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
      }));

      expect(getByGuidSpy).toHaveBeenCalledWith('guid');
      expect(getByGuidSpy).toHaveBeenCalledTimes(1);
    });
  });
});
