import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../app/features/auth/authSlice';
import chatReducer from '../app/features/chat/chatSlice';
import profileReducer from '../app/features/profile/profileSlice';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web //import storage from storage.ts to use indexdb
import storage from './storage'; // defaults to localStorage for web //import storage from storage.ts to use indexdb

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Root reducer combining all feature reducers
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  profile: profileReducer,
});

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
