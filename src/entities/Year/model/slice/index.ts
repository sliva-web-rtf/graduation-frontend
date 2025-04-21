import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentAcademicYear } from '../../lib';
import { YearSchema } from '../types';

export const initialState: YearSchema = {
    academicYear: '',
};

export const yearSlice = createSlice({
    name: 'year',
    initialState,
    reducers: {
        setAcademicYear: (state, action: PayloadAction<YearSchema['academicYear'] | null | undefined>) => {
            state.academicYear = action.payload || getCurrentAcademicYear();
        },
    },
});

export const { actions: yearActions, reducer: yearReducer } = yearSlice;
