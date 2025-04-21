import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice';

export const getMyStudentsState = (state: StateSchema) => state.myStudents || initialState;
