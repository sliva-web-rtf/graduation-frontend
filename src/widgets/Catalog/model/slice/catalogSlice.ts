import { userApi } from '@/entities/User';
import { CATALOG_CARD_HEIGHT, SortDirection } from '@/shared/lib/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCatalogOptionsForRoles } from '../../lib';
import { CatalogOption, CatalogSchema } from '../types';

export const initialState: CatalogSchema = {
    option: CatalogOption.Topics,
    options: [CatalogOption.Topics],
    page: 0,
    size: Math.round((window.innerHeight - 335) / (CATALOG_CARD_HEIGHT + 16)),
    pagesCount: {
        [CatalogOption.Supervisors]: 1,
        [CatalogOption.Topics]: 1,
        [CatalogOption.Students]: 1,
    },
    academicProgram: '',
    order: SortDirection.DESC,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<CatalogSchema['query']>) => {
            state.query = action.payload;
            state.page = 0;
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
        setAcademicProgram: (state, action: PayloadAction<CatalogSchema['academicProgram']>) => {
            state.academicProgram = action.payload;
        },
        setOrder: (state, action: PayloadAction<CatalogSchema['order']>) => {
            state.order = action.payload;
        },
        setIncludeOwnedTopics: (state, action: PayloadAction<CatalogSchema['includeOwnedTopics']>) => {
            state.includeOwnedTopics = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.user.matchFulfilled, (state, { payload }) => {
            state.options = getCatalogOptionsForRoles(payload?.roles ?? []);
        });
    },
});

export const { actions: catalogActions } = catalogSlice;
export const { reducer: catalogReducer } = catalogSlice;
