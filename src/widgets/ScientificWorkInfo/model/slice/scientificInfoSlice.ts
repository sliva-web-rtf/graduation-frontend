import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScientificWorkInfoSchema } from '../types/scientificWorkInfoSchema';
import { ToggleOptions } from '../types/toggleOptions';

const initialState: ScientificWorkInfoSchema = {
    option: ToggleOptions.General,
    options: Object.values(ToggleOptions),
};

export const ScientificInfoSlice = createSlice({
    name: 'scientificWork',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<ScientificWorkInfoSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: scientificWorkInfoActions } = ScientificInfoSlice;
export const { reducer: scientificWorkInfoReducer } = ScientificInfoSlice;
