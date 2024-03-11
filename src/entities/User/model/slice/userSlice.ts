import { createSlice } from '@reduxjs/toolkit';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
  _isInited: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.authData = undefined;
      UserSecretStorageService.clear();
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
