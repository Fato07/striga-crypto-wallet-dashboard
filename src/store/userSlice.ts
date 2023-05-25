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
    updateUser: (state, action) => {
      const { payload } = action;
      state.userId = payload.userId;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.mobile.countryCode = payload.mobile.countryCode;
      state.mobile.number = payload.mobile.number;
      state.address.addressLine1 = payload.address.addressLine1;
      state.address.city = payload.address.city;
      state.address.country = payload.address.country;
      state.address.postalCode = payload.address.postalCode;
      state.KYC.emailVerified = payload.KYC.emailVerified;
      state.KYC.mobileVerified = payload.KYC.mobileVerified;
      state.KYC.status = payload.KYC.status;
      state.createdAt = payload.createdAt;
      state.expectedIncomingTxVolumeYearly =
        payload.expectedIncomingTxVolumeYearly;
      state.expectedOutgoingTxVolumeYearly =
        payload.expectedOutgoingTxVolumeYearly;
      state.occupation = payload.occupation;
      state.placeOfBirth = payload.placeOfBirth;
      state.purposeOfAccount = payload.purposeOfAccount;
      state.selfPepDeclaration = payload.selfPepDeclaration;
      state.sourceOfFunds = payload.sourceOfFunds;

      // return { ...state, ...action.payload };
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

export const { logOut, updateUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
