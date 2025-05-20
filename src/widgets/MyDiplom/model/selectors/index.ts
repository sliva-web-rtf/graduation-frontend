import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice';

export const getDiplom = (state: StateSchema) => state.diplom ?? initialState;
