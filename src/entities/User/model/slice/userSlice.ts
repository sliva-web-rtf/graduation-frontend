import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { STATUS } from '@/shared/api/status';
import { UserSchema } from '../types/user';
import { actions } from '../actions';

const initialState: UserSchema = {
    userStatus: STATUS.initial,
    isInited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = undefined;
            state.userStatus = STATUS.initial;
            state.userError = undefined;
            state.tokenError = undefined;
            state.isInited = true;
            UserSecretStorageService.clear();
        },
        setInitValue: (state, action: PayloadAction<boolean>) => {
            state.isInited = action.payload;
        },
        changeRegistration: (state, action: PayloadAction<boolean>) => {
            if (state.authData) {
                state.authData.isRegistrationComplete = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actions.requestUser, (state) => {
                state.userStatus = STATUS.request;
                state.userError = undefined;
            })
            .addCase(actions.successUser, (state, { payload }) => {
                state.userStatus = STATUS.success;
                state.authData = payload;
                state.isInited = true;
            })
            .addCase(actions.failureUser, (state, { payload }) => {
                state.userStatus = STATUS.failure;
                state.userError = payload;
                state.isInited = true;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
