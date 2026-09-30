import { MMKV } from 'react-native-mmkv';

/**
 * Single MMKV instance used for the redux-persist storage engine and any
 * ad-hoc key/value caching outside Redux.
 */
export const storage = new MMKV({ id: 'tentwenty-app-storage' });
