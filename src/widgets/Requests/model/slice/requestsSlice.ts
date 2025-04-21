import { userApi } from '@/entities/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRequestsOptionsForRoles } from '../../lib';
import { RequestsOption, type RequestsSchema } from '../types';

export const initialState: RequestsSchema = {
    option: RequestsOption.Incoming,
    options: [RequestsOption.Incoming, RequestsOption.Outgoing, RequestsOption.History],
};

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<RequestsSchema['option']>) => {
            state.option = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.user.matchFulfilled, (state, { payload }) => {
            state.options = getRequestsOptionsForRoles(payload?.roles ?? []);
        });
    },
});

export const { actions: requestsActions } = requestsSlice;
export const { reducer: requestsReducer } = requestsSlice;
