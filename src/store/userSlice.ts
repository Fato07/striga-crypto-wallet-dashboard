import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {UserStateSchema } from '../schemas/userSchema';
import { UserState } from '@/types/userTypes';
import userInitialState from './initialStates/userInitialState';


export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    signUp: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.firstName = '';
      state.lastName = '';
    },
  },
});

export const { signUp, logOut } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
