import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogPage = (state: StateSchema) => state.catalog?.page || initialState.page;
