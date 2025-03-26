import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/personInfoSlice';

export const getPersonInfoOption = (state: StateSchema) => state['person-info']?.option || initialState.option;
