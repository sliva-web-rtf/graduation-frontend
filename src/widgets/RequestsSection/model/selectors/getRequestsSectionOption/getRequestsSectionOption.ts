import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/requestsSectionSlice';

export const getRequestsSectionOption = (state: StateSchema) => state.requestsSection?.option || initialState.option;
