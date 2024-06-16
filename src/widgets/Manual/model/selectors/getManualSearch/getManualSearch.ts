import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/manualSlice';

export const getManualSearch = (state: StateSchema) => state.manual?.search || initialState.search;
