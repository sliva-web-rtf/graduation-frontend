import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/personInfoSlice';

export const getPersonInfoOptions = (state: StateSchema) => state['person-info']?.options || initialState.options;
