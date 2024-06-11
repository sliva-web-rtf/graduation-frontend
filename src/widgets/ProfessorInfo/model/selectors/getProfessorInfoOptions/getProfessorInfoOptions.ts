import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/professorInfoSlice';

export const getProfessorInfoOptions = (state: StateSchema) => state.professor?.options || initialState.options;
