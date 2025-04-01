import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/personInfoSlice';

export const getPersonInfo = (state: StateSchema) => state['person-info'] || initialState;
