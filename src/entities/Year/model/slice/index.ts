import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { yearApi } from '../../api';
import { getCurrentAcademicYear } from '../../lib';
import { YearSchema } from '../types';

export const initialState: YearSchema = {
    academicYear: '',
};

export const yearSlice = createSlice({
    name: 'year',
    initialState,
    reducers: {
        setAcademicYear: (state, action: PayloadAction<YearSchema['academicYear']>) => {
            state.academicYear = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(yearApi.endpoints.getDefaultYear.matchFulfilled, (state, { payload }) => {
            state.academicYear = payload || getCurrentAcademicYear();
        });
    },
});

export const { actions: yearActions, reducer: yearReducer } = yearSlice;
