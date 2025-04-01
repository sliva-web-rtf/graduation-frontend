import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/requestsSlice';

export const getRequestsSection = (state: StateSchema) => state.requests || initialState;
