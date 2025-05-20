import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
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
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.user.matchFulfilled, (state, { payload }) => {
            state.user = payload;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
