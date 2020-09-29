import { getLogger } from '@/logger'

export class Repository {
    #version = 1;
    indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    #database = null;

    constructor() {
        this.logger = getLogger({
            namespace: 'Storage',
            loggerName: 'Repository'
        })
        if (!this.indexedDB) {
            this.logger.fatal("Ваш браузер не поддерживат стабильную версию IndexedDB");
        }
    }

    open(dbName) {
        if(this.#database) return null;

        return new Promise((resolve, reject) => {
            const request = this.indexedDB.open(dbName, this.#version);

            request.onerror = (event) => {
                this.logger.error(`Could not open db ${dbName}`, event);
                reject(event)
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                this.logger.debug(`DB ${dbName} opened!`, event);
                this.saveDB(db);

                resolve(event);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                this.saveDB(db);
    
                var objectStore = db.createObjectStore("booksStore", { keyPath: "guid" });
                objectStore.createIndex("guid", "guid", { unique: true });

                const transaction = event.target.transaction;

                transaction.oncomplete = resolve;
                transaction.onerror = reject;
            };
        })
    }

    openRWTransaction(objectStore) {
        const transaction = this.#database.transaction([objectStore], "readwrite")

        transaction.onerror = (event) => {
            this.logger.error(`Transaction failed: `, event)
        };
        
        transaction.oncomplete  = () => {
            this.logger.debug(`Transaction completed`)
        }

        return transaction;
    }

    saveDB(db) {
        this.#database = db;

        this.#database.onerror = (event) => {
            this.logger.error(`DB error`, event);
        }
    }

    save(storeName, object) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            const tr = store.add(object);

            tr.onerror = (event) => reject(event);
            tr.onsuccess = (event) => resolve(event);
        });
    }

    update(storeName, object) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            const tr = store.put(object);

            tr.onerror = (event) => reject(event);
            tr.onsuccess = (event) => resolve(event);
        });
    }

    delete(storeName, guid) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            const tr = store.delete(guid);

            tr.onerror = (event) => reject(event);
            tr.onsuccess = (event) => resolve(event);
        });
    }

    saveMany(storeName, objects) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            objects.forEach(function(item) {
                store.add(item);
            });

            transaction.onerror = (event) => reject(event);
            transaction.oncomplete = (event) => resolve(event);
        });
    }


    deleteMany(storeName, objects) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            objects.forEach(function(item) {
                store.delete(item);
            });

            transaction.onerror = (event) => reject(event);
            transaction.oncomplete = (event) => resolve(event);
        });
    }

    updateMany(storeName, objects) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {

            const store = transaction.objectStore(storeName);

            objects.forEach(function(item) {
                store.put(item);
            });

            transaction.onerror = (event) => reject(event);
            transaction.oncomplete = (event) => resolve(event);
        });
    }

    all(storeName) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {
            const store = transaction.objectStore(storeName);

            const request = store.getAll();

            request.onerror = (event) => reject(event);
            request.onsuccess = (event) => resolve(event.target.result);
        });
    }

    clear(storeName) {
        const transaction = this.openRWTransaction(storeName);

        return new Promise((resolve, reject) => {
            const store = transaction.objectStore(storeName);

            const request = store.clear();

            request.onerror = (event) => reject(event);
            request.onsuccess = (event) => resolve(event.target.result);
        });
    }
}