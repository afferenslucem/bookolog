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
            window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
        }
    }

    open(dbName) {
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

                resolve(event);
            };
        })
    }

    openRWTransaction(objectStore) {
        const transaction = this.#database.transaction([objectStore], "readwrite")

        transaction.onerror = (event) => {
            this.logger.error(`Transaction failed: `, event)
        };
        
        transaction.oncomplete  = () => {
            this.logger.error(`Transaction completed`)
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
}