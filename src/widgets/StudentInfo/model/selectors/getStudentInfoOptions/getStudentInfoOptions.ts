import { StateSchema } from 'app/providers/StoreProvider';

export const getStudentInfoOptions = (state: StateSchema) => state.student.options;
