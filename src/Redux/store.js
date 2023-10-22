import { initState } from './users.init-state';

import { usersReducer } from './user.slice';

import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  preloadedState: initState,
  devTools: true,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
