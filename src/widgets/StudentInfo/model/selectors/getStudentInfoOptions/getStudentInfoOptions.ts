import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/studentInfoSlice';

export const getStudentInfoOptions = (state: StateSchema) => state.student?.options || initialState.options;
