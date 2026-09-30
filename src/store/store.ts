import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { reduxPersistMmkvStorage } from '@storage/reduxPersistStorage';
import { tmdbApi } from './api/tmdbApi';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

const persistConfig = {
  key: 'tentwenty-root',
  storage: reduxPersistMmkvStorage,
  // Persist client UI state and the RTK Query cache (offline-first data).
  whitelist: ['ui', tmdbApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tmdbApi.middleware),
});

// Enables RTK Query's refetchOnFocus / refetchOnReconnect behaviour — part of
// the "refetch when the network returns" requirement.
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
