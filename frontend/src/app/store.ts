import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';
import chatReducer from '../app/features/chat/chatSlice';
import profileReducer from '../app/features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
