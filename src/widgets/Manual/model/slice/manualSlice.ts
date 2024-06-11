import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManualSchema } from '../types/ManualSchema';

export const initialState: ManualSchema = {
    search: '',
};

export const manualSlice = createSlice({
    name: 'manual',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<ManualSchema['search']>) => {
            state.search = action.payload;
        },
    },
});

export const { actions: manualActions } = manualSlice;
export const { reducer: manualReducer } = manualSlice;
