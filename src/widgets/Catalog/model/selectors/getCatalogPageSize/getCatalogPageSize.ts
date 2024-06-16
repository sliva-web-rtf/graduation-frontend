import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogPageSize = (state: StateSchema) => state.catalog?.pageSize || initialState.pageSize;
