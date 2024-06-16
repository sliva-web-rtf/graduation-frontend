import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogOption = (state: StateSchema) => state.catalog?.option || initialState.option;
