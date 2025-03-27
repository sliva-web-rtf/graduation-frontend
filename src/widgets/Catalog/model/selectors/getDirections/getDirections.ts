import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getDirections = (state: StateSchema) => state.catalog?.directions || initialState.directions;
