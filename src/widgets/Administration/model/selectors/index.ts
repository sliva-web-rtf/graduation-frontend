import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice';

export const getAdministrationData = (state: StateSchema) => state.administration || initialState;
