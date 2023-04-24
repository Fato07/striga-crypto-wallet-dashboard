import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserState } from '@/types/userTypes';
import userInitialState from './initialStates/userInitialState';
import axios from 'axios';

export const signUpAsync = createAsyncThunk(
  'user/signUpAsync',
  async (userData: UserState, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userData);
      const data = response.data;
      if (response.status !== 200) throw new Error(data.error);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.firstName = '';
      state.lastName = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signUpAsync.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          // Update the state with the signed up user information
          return { ...state, ...action.payload, isLoggedIn: true };
        },
      )
      .addCase(signUpAsync.rejected, (state, action) => {
        // Handle any errors that occurred during sign up
        console.error(action.error.message);
      });
  },
});

export const { logOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
