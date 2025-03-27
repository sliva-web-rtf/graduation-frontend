import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { CatalogOption } from '../types/catalogOption';
import { DIRECTIONS } from '@/shared/lib/const';

export const initialState: CatalogSchema = {
    option: CatalogOption.Topics,
    options: Object.values(CatalogOption),
    page: 1,
    pageSize: 3,
    pagesCount: {
        [CatalogOption.Managers]: 1,
        [CatalogOption.Topics]: 1,
        [CatalogOption.Students]: 1,
    },
    scientificInterests: [],
    directions: DIRECTIONS,
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
        setDirections: (state, action: PayloadAction<CatalogSchema['directions']>) => {
            state.directions = action.payload;
        },
        setIsFavoriteFilter: (state, action: PayloadAction<CatalogSchema['isFavoriteFilterOnly']>) => {
            state.isFavoriteFilterOnly = action.payload;
        },
    },
});

export const { actions: catalogActions } = catalogSlice;
export const { reducer: catalogReducer } = catalogSlice;
