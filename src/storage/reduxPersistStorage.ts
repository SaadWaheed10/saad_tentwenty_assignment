import { storage } from './mmkv';

/**
 * redux-persist expects an async-shaped storage engine (getItem/setItem/
 * removeItem returning Promises), even though MMKV itself is synchronous.
 * Wrapping it keeps MMKV's speed while satisfying that interface.
 */
export const reduxPersistMmkvStorage = {
  setItem(key: string, value: string): Promise<void> {
    storage.set(key, value);
    return Promise.resolve();
  },
  getItem(key: string): Promise<string | null> {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem(key: string): Promise<void> {
    storage.delete(key);
    return Promise.resolve();
  },
};
