import { Injectable } from '@angular/core';
import { getLogger } from '../app.logging';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  protected logger = getLogger({
    loggerName: 'IndexedDb',
    namespace: 'Storage',
  });
  private readonly version = 1;
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
        this.upgradeDatabase(event);

        this.database = event.target.result;
        const transaction = event.target.transaction;

        transaction.oncomplete = resolve;
        transaction.onerror = reject;
      };
    }));
  }

  public close(): void {
    this.database.close();
    this.database = null;
  }

  private upgradeDatabase(dbEvent: any): void {
    const db = dbEvent.target.result;

    if (dbEvent.oldVersion < 1) {
      const objectStore = db.createObjectStore('BooksStore', {keyPath: 'guid'});
      objectStore.createIndex('guid', 'guid', {unique: true});
    }
  }

  public save(storeName: string, object: any): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.add(object);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public saveMany(storeName: string, objects: any[]): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      objects.forEach(item => store.add(item));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public update(storeName: string, object: any): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.put(object);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public updateMany(storeName: string, objects: any[]): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      objects.forEach(item => store.put(item));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public delete(storeName: string, id: any): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise((resolve, reject) => {

      const store = transaction.objectStore(storeName);

      const tr = store.delete(id);

      tr.onerror = (event) => reject(event);
      tr.onsuccess = (event) => resolve(event);
    });
  }

  public deleteMany(storeName: string, ids: any[]): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise<Event>((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      ids.forEach(id => store.delete(id));

      transaction.onerror = (event) => reject(event);
      transaction.oncomplete = (event) => resolve(event);
    });
  }

  public all(storeName: string): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const request = store.getAll();

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public get(storeName: string, id: string): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const request = store.get(id);

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  public clear(storeName: string): Promise<Event> {
    const transaction = this.openRWTransaction(storeName);

    return new Promise((resolve, reject) => {
      const store = transaction.objectStore(storeName);

      const request = store.clear();

      request.onerror = (event) => reject(event);
      request.onsuccess = (event) => resolve(event);
    });
  }

  private openRWTransaction(objectStore: string): IDBTransaction {
    const transaction = this.database.transaction([objectStore], 'readwrite');

    transaction.onerror = (event) => {
      this.logger.error(`Transaction failed: `, event);
    };

    transaction.oncomplete = () => {
      this.logger.debug(`Transaction completed`);
    };

    return transaction;
  }
}
