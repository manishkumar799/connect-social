import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPersonalMessagesApi, getAllChatsApi, sendPersonalMessagesApi, initiateChatApi } from './chatApi'; // Import the getAllChatsApi function
interface AllChatResponse {
  count: number;
  interactedUsers: string[];
  chats: chatsList[]
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

interface membersList {
  _id: string;
  name: string;
  email: string;
};
interface sender {
  _id: string;
  name: string;
}

interface ChatListState {
  count: number;
  chats: chatsList[];
  interactedUsers: string[];
  recipientId: string | null;
  chatName: string | null;
  selectedChatId: string | null;
  chatType: string | null;
  hidden: boolean,
  personalMessages: PersonalMessagesState[]; // Add this to store personal messages
  loading: boolean;
  refresh: boolean;
  error: any;
}

const initialState: ChatListState = {
  count: 0,
  interactedUsers: [],
  chats: [],
  personalMessages: [], // Initialize as an empty array
  recipientId: null, // Initialize as an empty array
  chatType: null, // Initialize as an empty array
  selectedChatId: null, // Initialize as an empty array
  chatName: null, // Initialize as an empty array
  loading: false,
  error: null,
  refresh: false,
  hidden: false,
};


interface PersonalMessagesState {
  _id: string,
  sender: {
    _id: string,
    name: string
  },
  content: string,
  chatType: string,
  chatId: string,
  timestamp: string,
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
  async (recipientId: string) => {
    try {
      const data = await fetchPersonalMessagesApi(recipientId); // Use the getAllChatsApi function from authApi.ts
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'Failed personal messages';
    }
  }
);
interface SendMessagePayload {
  recipientId: string | null;
  content: string;
}
export const sendPersonalMessage = createAsyncThunk(
  'chat/messages/personal/send',
  async ({ recipientId, content }: SendMessagePayload) => {
    try {
      const data = await sendPersonalMessagesApi(recipientId, content); // Use the getAllChatsApi function from authApi.ts
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'Failed personal messages';
    }
  }
);
export const initiateChat = createAsyncThunk(
  'chat/initiate-chat',
  async (recipientId: string) => {
    try {
      const data = await initiateChatApi(recipientId); // Use the getAllChatsApi function from authApi.ts
      return data; // Data contains the user and token
    } catch (err: any) {
      return err.response?.data?.message || 'Failed to initiate chat';
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setReceipientId: (state, action: PayloadAction<string>) => {
      state.recipientId = action.payload;
    },
    setChatName: (state, action: PayloadAction<string>) => {
      state.chatName = action.payload;
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
    },
    setRefresh: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    setChatType: (state, action: PayloadAction<string | null>) => {
      state.chatType = action.payload;
    },
  },

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
      })
      .addCase(sendPersonalMessage.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(sendPersonalMessage.fulfilled, (state, action: PayloadAction<PersonalMessagesState>) => {
        // state.loading = false;
        state.personalMessages=[...state.personalMessages,(action.payload)]; // Update personalMessages array
      })
      .addCase(sendPersonalMessage.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(initiateChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateChat.fulfilled, (state, action: PayloadAction<PersonalMessagesState[]>) => {
        state.loading = false;
        state.personalMessages = action.payload; // Update personalMessages array
      })
      .addCase(initiateChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export const { setReceipientId, setChatName, setHidden, setRefresh,setChatType,setSelectedChatId } = chatSlice.actions;
export default chatSlice.reducer;
