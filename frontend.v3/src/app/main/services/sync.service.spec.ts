import { TestBed } from '@angular/core/testing';
import { UserService } from '../../modules/user/services/user.service';
import { SyncService } from './sync.service';
import { BookService } from '../../modules/book/services/book.service';
import { CollectionService } from '../../modules/collection/services/collection.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SyncService', () => {
  let service: SyncService;
  let userService: UserService;
  let bookService: BookService;
  let collectionService: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SyncService);
    userService = TestBed.inject(UserService);
    bookService = TestBed.inject(BookService);
    collectionService = TestBed.inject(CollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sync user', async () => {
    const spy = spyOn(userService, 'loadMe');

    await service.syncUser();

    expect(spy).toHaveBeenCalledOnceWith();
  });

  describe('sync', () => {
    it('should restoreAll', async () => {
      const shouldRestoreSpy = spyOnProperty(service, 'shouldRestore').and.returnValue(true);
      const restoreAllSpy = spyOn(service, 'restoreAll');
      const syncAllSpy = spyOn(service, 'syncAll');

      await service.sync();

      expect(shouldRestoreSpy).toHaveBeenCalledOnceWith();
      expect(restoreAllSpy).toHaveBeenCalledWith();
      expect(syncAllSpy).not.toHaveBeenCalled();
    });

    it('should syncAll', async () => {
      const shouldRestoreSpy = spyOnProperty(service, 'shouldRestore').and.returnValue(false);
      const restoreAllSpy = spyOn(service, 'restoreAll');
      const syncAllSpy = spyOn(service, 'syncAll');

      await service.sync();

      expect(shouldRestoreSpy).toHaveBeenCalledOnceWith();
      expect(restoreAllSpy).not.toHaveBeenCalledWith();
      expect(syncAllSpy).toHaveBeenCalled();
    });
  });

  it('should restoreAll', async () => {
    const syncAllSpy = spyOn(service, 'syncAll');
    const userRestoreSpy = spyOn(userService, 'restore').and.resolveTo({
      books: 'books',
      collections: 'collections',
    } as any);

    const booksRestoreSpy = spyOn(bookService, 'restore').and.resolveTo();
    const collectionsRestoreSpy = spyOn(collectionService, 'restore').and.resolveTo();

    await service.restoreAll();

    expect(syncAllSpy).toHaveBeenCalledOnceWith();
    expect(userRestoreSpy).toHaveBeenCalledOnceWith();
    expect(booksRestoreSpy).toHaveBeenCalledOnceWith('books');
    expect(collectionsRestoreSpy).toHaveBeenCalledOnceWith('collections');
  });

  it('should syncAll', async () => {
    const getSyncDataSpy = spyOn(service, 'getSyncData').and.resolveTo({
      books: 'booksToSync',
      collections: 'collectionsToSync',
    } as any);
    const synchronizeSpy = spyOn(userService, 'synchronize').and.resolveTo({
      books: 'booksToSave',
      collections: 'collectionsToSave',
    } as any);
    const booksSyncSpy = spyOn(bookService, 'sync');
    const collectionsSyncSpy = spyOn(collectionService, 'sync');
    const userSyncSpy = spyOn(service, 'syncUser');

    await service.syncAll();

    expect(getSyncDataSpy).toHaveBeenCalledWith();
    expect(synchronizeSpy).toHaveBeenCalledWith({
      books: 'booksToSync',
      collections: 'collectionsToSync',
    } as any);
    expect(booksSyncSpy).toHaveBeenCalledWith('booksToSync' as any, 'booksToSave' as any);
    expect(collectionsSyncSpy).toHaveBeenCalledWith('collectionsToSync' as any, 'collectionsToSave' as any);
    expect(userSyncSpy).toHaveBeenCalledWith();
  });

  it('should getSyncData', async () => {
    const booksGetToSyncSpy = spyOn(bookService, 'getToSync').and.resolveTo('books' as any);
    const collectionsGetToSyncSpy = spyOn(collectionService, 'getToSync').and.resolveTo('collections' as any);

    const result = await service.getSyncData();

    expect(booksGetToSyncSpy).toHaveBeenCalledWith();
    expect(collectionsGetToSyncSpy).toHaveBeenCalledWith();

    expect(result).toEqual({
      books: 'books',
      collections: 'collections'
    } as any);
  });
});
