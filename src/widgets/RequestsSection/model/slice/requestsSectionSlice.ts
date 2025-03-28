import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestsSectionOption } from '../types/requestsSectionOption';
import { RequestsSectionSchema } from '../types/requestsSectionSchema';

export const initialState: RequestsSectionSchema = {
    option: RequestsSectionOption.Incoming,
    options: Object.values(RequestsSectionOption),
};

export const requestsSectionSlice = createSlice({
    name: 'requestsSection',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<RequestsSectionSchema['option']>) => {
            state.option = action.payload;
        },
        setOptions: (state, action: PayloadAction<RequestsSectionSchema['options']>) => {
            state.options = action.payload;
        },
    },
});

export const { actions: requestsSectionActions } = requestsSectionSlice;
export const { reducer: requestsSectionReducer } = requestsSectionSlice;
