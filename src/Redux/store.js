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

// import { filterReducer } from './filter.slice';

//   data: contactsReducer,
// });

// const enhancer = devToolsEnhancer();
// export const store = createStore(rootReducer, initState, enhancer);

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

// export const store = configureStore({
//     reducer: {
//       tasks: tasksReducer,
//       filters: filtersReducer,
//     },
//   });

// const rootReducer = combineReducers({
//   filter: contactsReducer,
//   contacts: contactsReducer,
// });
