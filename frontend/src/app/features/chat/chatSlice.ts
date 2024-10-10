import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllChatsApi } from './chatApi'; // Import the getAllChatsApi function
interface AllChatResponse {
    count: number;
    interactedUsers: string[];
    chats:chatsList[]
  }

  interface chatsList{
    _id:string;
    chatType:string;
    members:membersList[];
    lastInteraction:lastInteraction;
    lastMessage:string;
  }

  interface lastInteraction{
    _id:string;
    sender:sender;
    content:string;
  }

  interface membersList{
    _id:string;
    name:string;
    email:string;
  };
  interface sender{
    _id:string;
    name:string;
  }
  interface ChatListState {
    count: number;
    chats: chatsList[];
    interactedUsers: string[];
    loading: boolean,
    error: any,
  };
  const initialState: ChatListState = {
    count: 0,
    interactedUsers: [],
    chats: [],
    loading: false,
    error: null,
  };
// Async thunk to handle login via API
export const allChats = createAsyncThunk(
  'chat/chats',
  async () => {
    try {
      const data = await getAllChatsApi(); // Use the getAllChatsApi function from authApi.ts
      console.log(data)
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'allChats failed';
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers:{},

  extraReducers: (builder) => {
    builder
      .addCase(allChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allChats.fulfilled, (state, action: PayloadAction<AllChatResponse>) => {
        state.loading = false;
        // state.isAuthenticated = true;
        state.count = action.payload.count;
        state.interactedUsers = action.payload.interactedUsers;
        state.chats = action.payload.chats;
      })
      .addCase(allChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;
