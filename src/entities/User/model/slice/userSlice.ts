import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { UserSchema } from '../types/user';

export const initialState: UserSchema = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = undefined;
            UserSecretStorageService.clear();
        },
        setUser: (state, action: PayloadAction<UserSchema['user']>) => {
            state.user = action.payload;
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
