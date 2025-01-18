import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/profileSlice';

export const getProfileOption = (state: StateSchema) => state.profile?.option || initialState.option;
