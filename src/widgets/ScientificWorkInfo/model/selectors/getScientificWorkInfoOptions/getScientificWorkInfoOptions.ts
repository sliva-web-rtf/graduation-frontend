import { StateSchema } from 'app/providers/StoreProvider';

export const getScientificWorkInfoOptions = (state: StateSchema) => state.scientificWork.options;
