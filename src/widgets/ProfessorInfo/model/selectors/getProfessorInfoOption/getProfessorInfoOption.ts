import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/professorInfoSlice';

export const getProfessorInfoOption = (state: StateSchema) => state.professor?.option || initialState.option;
