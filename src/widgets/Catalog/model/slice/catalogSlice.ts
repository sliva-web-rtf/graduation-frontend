import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DIRECTIONS, SortDirection } from '@/shared/lib/const';
import { CatalogSchema } from '@/widgets/Catalog/model/types/catalogSchema';
import { CatalogOption } from '../types/catalogOption';

export const initialState: CatalogSchema = {
    search: '',
    option: CatalogOption.Topics,
    options: Object.values(CatalogOption),
    page: 1,
    pageSize: 3,
    pagesCount: {
        [CatalogOption.Managers]: 1,
        [CatalogOption.Topics]: 1,
        [CatalogOption.Students]: 1,
    },
    direction: '',
    directions: DIRECTIONS,
    order: SortDirection.DESC,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<CatalogSchema['search']>) => {
            state.search = action.payload;
        },
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
        setDirection: (state, action: PayloadAction<CatalogSchema['direction']>) => {
            state.direction = action.payload;
        },
        setOrder: (state, action: PayloadAction<CatalogSchema['order']>) => {
            state.order = action.payload;
        },
    },
});

export const { actions: catalogActions } = catalogSlice;
export const { reducer: catalogReducer } = catalogSlice;
