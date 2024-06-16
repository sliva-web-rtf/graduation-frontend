import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogInterests = (state: StateSchema) =>
    state.catalog?.scientificInterests || initialState.scientificInterests;
