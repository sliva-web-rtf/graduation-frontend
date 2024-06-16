import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogAreas = (state: StateSchema) => state.catalog?.scientificAreas || initialState.scientificAreas;
