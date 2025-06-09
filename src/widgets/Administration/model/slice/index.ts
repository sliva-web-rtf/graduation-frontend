import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdministrationOption, AdministrationSchema } from '../types';

export const initialState: AdministrationSchema = {
    option: AdministrationOption.Global,
    options: Object.values(AdministrationOption),
};

export const administrationSlice = createSlice({
    name: 'administration',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<AdministrationSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: administrationActions, reducer: administrationReducer } = administrationSlice;
