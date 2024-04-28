import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogSchema } from 'widgets/Catalog/model/types/catalogSchema';
import { CatalogOptions } from 'shared/lib/types/options';

const initialState: CatalogSchema = {
    option: CatalogOptions.Supervisors,
    options: Object.values(CatalogOptions),
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
