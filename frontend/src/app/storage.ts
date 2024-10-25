// storage.ts
import idbKeyval from './idbKeyval'; // Your existing IDB utility

const storage = {
  async getItem(key: string): Promise<string | null> {
    const value = await idbKeyval.get(key);
    return value ? JSON.stringify(value) : null;
  },
  async setItem(key: string, value: string): Promise<void> {
    await idbKeyval.set(key, JSON.parse(value));
  },
  async removeItem(key: string): Promise<void> {
    await idbKeyval.delete(key);
  },
  async clear(): Promise<void> {
    await idbKeyval.clear();
  }
};

export default storage;
