import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalog = (state: StateSchema) => state.catalog || initialState;
