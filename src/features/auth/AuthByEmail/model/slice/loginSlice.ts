import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '@/shared/api/status';
import { LoginSchema } from '../types/loginSchema';
import { actions } from '../actions';

const initialState: LoginSchema = {
    email: '',
    password: '',
    status: STATUS.initial,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<LoginSchema['email']>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<LoginSchema['password']>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actions.request, (state) => {
                state.error = undefined;
                state.status = STATUS.request;
            })
            .addCase(actions.success, (state) => {
                state.status = STATUS.success;
            })
            .addCase(actions.failure, (state, action) => {
                state.status = STATUS.failure;
                state.error = action.payload;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
