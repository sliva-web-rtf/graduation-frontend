import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfessorInfoSchema } from '../types/ProfessorInfoSchema';
import { ToggleOptions } from '../types/toggleOptions';

const initialState: ProfessorInfoSchema = {
    option: ToggleOptions.Portfolio,
    options: Object.values(ToggleOptions),
};

export const ProfessorInfoSlice = createSlice({
    name: 'professor',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<ProfessorInfoSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: professorInfoActions } = ProfessorInfoSlice;
export const { reducer: professorInfoReducer } = ProfessorInfoSlice;
