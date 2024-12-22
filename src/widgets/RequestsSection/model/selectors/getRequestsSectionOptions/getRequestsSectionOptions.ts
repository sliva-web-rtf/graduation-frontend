import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/requestsSectionSlice';

export const getRequestsSectionOptions = (state: StateSchema) => state.requestsSection?.options || initialState.options;
