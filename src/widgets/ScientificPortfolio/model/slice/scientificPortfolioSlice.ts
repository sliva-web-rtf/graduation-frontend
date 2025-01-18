import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScientificPortfolioSchema } from '../types/scientificPortfolioSchema';
import { ProfessorScientificFormSchema } from '../types/professorScientificFormSchema';
import { StudentScientificFormSchema } from '../types/studentScientificFormSchema';

export const initialState: ScientificPortfolioSchema = {};

export const scientificPortfolioSlice = createSlice({
    name: 'scientificPortfolio',
    initialState,
    reducers: {
        setProfessorScientificPortfolio: (state, action: PayloadAction<ProfessorScientificFormSchema | undefined>) => {
            state.professorScientificInfo = action.payload;
        },
        setStudentScientificPortfolio: (state, action: PayloadAction<StudentScientificFormSchema | undefined>) => {
            state.studentScientificInfo = action.payload;
        },
    },
});

export const { actions: scientificPortfolioActions } = scientificPortfolioSlice;
export const { reducer: scientificPortfolioReducer } = scientificPortfolioSlice;
