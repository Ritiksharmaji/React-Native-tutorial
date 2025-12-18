// import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';

// export const store = configureStore({
//   reducer: {
//     todo: todoReducer,
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import todoReducer from './todoSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  todoReducer
);

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
