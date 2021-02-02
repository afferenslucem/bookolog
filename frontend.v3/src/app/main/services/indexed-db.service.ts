import { Injectable } from '@angular/core';
import { getConsoleLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  protected logger = getConsoleLogger({
    loggerName: 'IndexedDb',
    namespace: 'Storage',
  });
  private readonly version = 5;
  private readonly indexedDB = window.indexedDB;
  private database: IDBDatabase;

  constructor() {
  }

  public open(dbName: string): Promise<Event> {
    return new Promise<Event>(((resolve, reject) => {
      if (!!this.database) {
        reject('Db already in use');
      }

      const request = this.indexedDB.open(dbName, this.version);

      request.onerror = (event) => {
        this.logger.error(`Could not open db ${dbName}`, event);
        reject(event);
      };

      request.onsuccess = (event: any) => {
        this.database = event.target.result;
        this.logger.debug(`DB ${dbName} opened!`, event);

        resolve(event);
      };

      request.onupgradeneeded = (event: any) => {
        this.upgradeDatabase(request, event);

        this.database = event.target.result;
        const transaction = event.target.transaction;

        transaction.oncomplete = resolve;
        transaction.onerror = reject;
      };
    }));
  }

  public close(): void {
    if (this.database !== null) {
      this.database.close();
      this.database = null;
    }
  }

  public save(storeName: string, object: any): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.add(object);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public saveMany(storeName: string, objects: any[]): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      objects.forEach(item => store.add(item));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public update(storeName: string, object: any): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.put(object);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public updateMany(storeName: string, objects: any[]): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      objects.forEach(item => store.put(item));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public delete(storeName: string, id: any): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.delete(id);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public deleteMany(storeName: string, ids: any[]): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      ids.forEach(id => store.delete(id));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public all(storeName: string): Promise<Event> {
    const transaction = this.openTransaction(storeName, 'readonly');

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const request = store.getAll();

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public getCount(storeName: string, propName: string, value?: any): Promise<Event> {
    const transaction = this.openTransaction(storeName, 'readonly');

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const index = store.index(propName);

      const request = index.count(value);

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public allWithProperty(storeName: string, propName: string, value: any): Promise<Event> {
    const transaction = this.openTransaction(storeName, 'readonly');

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const index = store.index(propName);

      const request = index.getAll(IDBKeyRange.only(value));

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public get(storeName: string, propName: string, id: string): Promise<Event> {
    const transaction = this.openTransaction(storeName, 'readonly');

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const index = store.index(propName);

      const request = index.get(IDBKeyRange.only(id));

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public clear(storeName: string): Promise<Event> {
    const transaction = this.openTransaction(storeName);

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const request = store.clear();

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  private upgradeDatabase(request: IDBRequest, dbEvent: any): void {
    const db = dbEvent.target.result;
    const upgradeTransaction = dbEvent.target.transaction;

    if (dbEvent.oldVersion < 1) {
      const objectStore = db.createObjectStore('BooksStore', {keyPath: 'guid'});
      objectStore.createIndex('guid', 'guid', {unique: true});
      objectStore.createIndex('type', 'type', {unique: false});
      objectStore.createIndex('genre', 'genre', {unique: false});
      objectStore.createIndex('status', 'status', {unique: false});
      objectStore.createIndex('shouldSync', 'shouldSync', {unique: false});
      objectStore.createIndex('deleted', 'deleted', {unique: false});
    }

    if (dbEvent.oldVersion < 2) {
      const objectStore = db.createObjectStore('CollectionsStore', {keyPath: 'guid'});
      objectStore.createIndex('guid', 'guid', {unique: true});
      objectStore.createIndex('type', 'type', {unique: false});
      objectStore.createIndex('shouldSync', 'shouldSync', {unique: false});
      objectStore.createIndex('deleted', 'deleted', {unique: false});
    }

    if (dbEvent.oldVersion < 4) {
      const objectStore = db.createObjectStore('BookCollectionsRecordStore', {keyPath: 'guid'});
      objectStore.createIndex('collectionId', 'collectionId', {unique: false});
      objectStore.createIndex('bookId', 'bookId', {unique: false});
    }

    if (dbEvent.oldVersion < 5) {
      db.deleteObjectStore('BookCollectionsRecordStore');
      const objectStore = upgradeTransaction.objectStore('BooksStore');
      objectStore.createIndex('collectionGuid', 'collectionGuid', {unique: false});
    }
  }

  private openTransaction(objectStore: string, transactionType: 'readwrite' | 'readonly' = 'readwrite'): IDBTransaction {
    const transaction = this.database.transaction([objectStore], transactionType);

    transaction.onerror = (event) => {
      this.logger.error(`Transaction failed: `, event);
    };

    transaction.oncomplete = () => {
      this.logger.debug(`Transaction completed`);
    };

    return transaction;
  }
}
