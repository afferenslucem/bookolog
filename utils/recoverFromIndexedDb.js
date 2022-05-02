function exportAll(dbName) {
  const request = indexedDB.open(dbName, 7);

  request.onsuccess = () => {
    const db = request.result;
    const stores = Array.from(db.objectStoreNames);
    const promises = stores.map((storeName) => {
      return new Promise((resolve) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);

        store.getAll().onsuccess = (event) => {
          resolve({ storeName, result: event.target.result });
        };
      });
    });

    Promise.all(promises).then((results) => {
      console.log(JSON.stringify(results));
    });
  };
}
