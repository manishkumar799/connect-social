import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProfileApi } from './profileApi';

interface ProfileState{
    _id: string|null;
    name: string|null;
    email: string|null;
    loading: boolean;
    error:string|null
}

const initialState: ProfileState={
    _id:null,
    name:null,
    email:null,
    loading:true,
    error:null
}

export const getProfile = createAsyncThunk(
    'user/profile',
    async () => {
      try {
        const data = await getProfileApi(); // Use the getAllChatsApi function from authApi.ts
        return data; // Data contains the user and token
      } catch (err: any) {
        return err.response?.data?.message || 'get profile failed';
      }
    }
  );

  const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},
  
    extraReducers: (builder) => {
      builder
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileState>) => {
          state.loading = false;
          // state.isAuthenticated = true;
          state._id = action.payload._id;
          state.name = action.payload.name;
          state.email = action.payload.email;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default profileSlice.reducer;