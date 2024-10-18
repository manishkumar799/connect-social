import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPersonalMessagesApi, getAllChatsApi } from './chatApi'; // Import the getAllChatsApi function
interface AllChatResponse {
    count: number;
    interactedUsers: string[];
    chats:chatsList[]
  }

  interface chatsList {
    _id: string;
    chatType: string;
    members: membersList[];
    lastInteraction: string;
    lastMessage: lastMessage;
  }
  
  interface lastMessage {
    _id: string;
    sender: sender;
    content: string;
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
  interface ChatListState {
    count: number;
    chats: chatsList[];
    interactedUsers: string[];
    personalMessages: PersonalMessagesState[]; // Add this to store personal messages
    loading: boolean;
    error: any;
  }
  
  const initialState: ChatListState = {
    count: 0,
    interactedUsers: [],
    chats: [],
    personalMessages: [], // Initialize as an empty array
    loading: false,
    error: null,
  };
  

  interface PersonalMessagesState{
    _id: string,
    sender: {
        _id: string,
        name: string
    },
    content: string,
    chatType: string,
    chatId: string,
  }
// Async thunk to handle login via API
export const allChats = createAsyncThunk(
  'chat/chats',
  async () => {
    try {
      const data = await getAllChatsApi(); // Use the getAllChatsApi function from authApi.ts
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'allChats failed';
    }
  }
);
export const personalMessages = createAsyncThunk(
  'chat/messages/personal',
  async (recipientId:string) => {
    try {
      const data = await fetchPersonalMessagesApi(recipientId); // Use the getAllChatsApi function from authApi.ts
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'Failed personal messages';
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
        state.count = action.payload.count;
        state.interactedUsers = action.payload.interactedUsers;
        state.chats = action.payload.chats;
      })
      .addCase(allChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(personalMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(personalMessages.fulfilled, (state, action: PayloadAction<PersonalMessagesState[]>) => {
        state.loading = false;
        state.personalMessages = action.payload; // Update personalMessages array
      })
      .addCase(personalMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chatSlice.reducer;
