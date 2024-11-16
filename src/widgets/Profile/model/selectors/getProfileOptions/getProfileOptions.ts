import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getProfileOptions = (state: StateSchema) => state.profile?.options || initialState.options;
