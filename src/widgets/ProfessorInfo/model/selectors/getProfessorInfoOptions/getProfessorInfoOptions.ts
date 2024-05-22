import { StateSchema } from 'app/providers/StoreProvider';

export const getProfessorInfoOptions = (state: StateSchema) => state.professor.options;
