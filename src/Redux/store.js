import { initState } from './contacts.init-state';

import { contactsReducer } from './contacts.slice';

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
  key: 'contact',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

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
