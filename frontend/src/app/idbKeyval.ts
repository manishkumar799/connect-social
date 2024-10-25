import { openDB, IDBPDatabase } from 'idb';

interface DBStructure {
  keyval: any; // Define this as a more specific type if you know what type of data will be stored
}

const dbPromise: Promise<IDBPDatabase<DBStructure>> = openDB<DBStructure>('redux-persist', 1, {
  upgrade(db) {
    db.createObjectStore('keyval');
  },
});

const idbKeyval = {
  async get<T = any>(key: IDBValidKey): Promise<T | undefined> {
    return (await dbPromise).get('keyval', key);
  },
  async set<T = any>(key: IDBValidKey, val: T): Promise<any> {
    return (await dbPromise).put('keyval', val, key);
  },
  async delete(key: IDBValidKey): Promise<void> {
    return (await dbPromise).delete('keyval', key);
  },
  async clear(): Promise<void> {
    return (await dbPromise).clear('keyval');
  },
};

export default idbKeyval;
