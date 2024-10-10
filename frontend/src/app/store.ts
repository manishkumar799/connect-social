import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';
import chatReducer from '../app/features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
