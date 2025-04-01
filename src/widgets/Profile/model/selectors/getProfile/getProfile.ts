import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getProfile = (state: StateSchema) => state.profile || initialState;
