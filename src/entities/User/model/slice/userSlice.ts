import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _isInited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.authData = undefined;
      UserSecretStorageService.clear();
    },
    setInitValue: (state, action: PayloadAction<boolean>) => {
      state._isInited = action.payload;
    },
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      state._isInited = true;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
