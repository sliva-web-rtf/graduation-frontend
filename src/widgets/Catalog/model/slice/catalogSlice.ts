import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogSchema } from 'widgets/Catalog/model/types/catalogSchema';
import { CatalogOptions } from 'entities/CatalogList';

const initialState: CatalogSchema = {
    option: CatalogOptions.Themes,
    options: Object.values(CatalogOptions),
    page: 1,
    pageSize: 10,
    pagesCount: 1,
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
        setPage: (state, action: PayloadAction<CatalogSchema['page']>) => {
            state.page = action.payload;
        },
        setPagesCount: (state, action: PayloadAction<CatalogSchema['pagesCount']>) => {
            state.pagesCount = action.payload;
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
