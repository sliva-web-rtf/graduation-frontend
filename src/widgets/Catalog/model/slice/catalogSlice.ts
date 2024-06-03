import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogSchema } from 'widgets/Catalog/model/types/catalogSchema';
import { CatalogOption } from '../types/catalogOption';

export const initialState: CatalogSchema = {
    option: CatalogOption.Themes,
    options: Object.values(CatalogOption),
    page: 1,
    pageSize: 5,
    pagesCount: {
        [CatalogOption.Professors]: 1,
        [CatalogOption.Themes]: 1,
        [CatalogOption.Students]: 1,
    },
    scientificInterests: [],
    scientificAreas: [],
    isFavoriteFilterOnly: false,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<CatalogSchema['option']>) => {
            state.option = action.payload;
        },
        setOptions: (state, action: PayloadAction<CatalogSchema['options']>) => {
            state.options = action.payload;
        },
        setPage: (state, action: PayloadAction<CatalogSchema['page']>) => {
            state.page = action.payload;
        },
        setPagesCount: (state, action: PayloadAction<number>) => {
            state.pagesCount[state.option] = action.payload;
        },
        setScientificInterests: (state, action: PayloadAction<CatalogSchema['scientificInterests']>) => {
            state.scientificInterests = action.payload;
        },
        setScientificAreas: (state, action: PayloadAction<CatalogSchema['scientificAreas']>) => {
            state.scientificAreas = action.payload;
        },
        setIsFavoriteFilter: (state, action: PayloadAction<CatalogSchema['isFavoriteFilterOnly']>) => {
            state.isFavoriteFilterOnly = action.payload;
        },
    },
});

export const { actions: catalogActions } = catalogSlice;
export const { reducer: catalogReducer } = catalogSlice;
