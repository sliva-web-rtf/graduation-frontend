import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

export const initialState: UserSchema = {
    topicId: '370a764c-be35-4cf8-adb0-cbef75389b70',
};

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
