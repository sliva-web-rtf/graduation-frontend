import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogSchema } from 'widgets/Catalog/model/types/catalogSchema';
import { CatalogOptions } from 'shared/lib/types/catalogOptions';

const initialState: CatalogSchema = {
    option: CatalogOptions.Professors,
    options: Object.values(CatalogOptions),
    pageSize: 10,
    scientificInterests: [],
    scientificAreas: [],
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<CatalogSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: catalogActions } = catalogSlice;
export const { reducer: catalogReducer } = catalogSlice;
