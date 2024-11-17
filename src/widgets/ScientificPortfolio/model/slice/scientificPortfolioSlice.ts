import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScientificPortfolioSchema } from '../types/scientificPortfolioSchema';

export const initialState: ScientificPortfolioSchema = {
    scientificInterests: [],
};
export const scientificPortfolioSlice = createSlice({
    name: 'scientificPortfolio',
    initialState,
    reducers: {
        setScientificInterests: (state, action: PayloadAction<ScientificPortfolioSchema['scientificInterests']>) => {
            state.scientificInterests = action.payload;
        },
    },
});

export const { actions: scientificPortfolioActions } = scientificPortfolioSlice;
export const { reducer: scientificPortfolioReducer } = scientificPortfolioSlice;
