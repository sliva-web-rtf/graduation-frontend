import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogPagesCount = (state: StateSchema) => state.catalog?.pagesCount || initialState.pagesCount;
