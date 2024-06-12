import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/studentInfoSlice';

export const getStudentInfoOption = (state: StateSchema) => state.student?.option || initialState.option;
