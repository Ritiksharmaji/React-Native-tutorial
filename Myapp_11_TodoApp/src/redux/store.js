import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import todoReducer from './todoSlice';
import { mmkvStorage } from './mmkvStorage';

const persistConfig = {
  key: 'todo',
  storage: mmkvStorage,
  whitelist: ['list'],
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: {
    todo: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
