import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../../slice/scientificPortfolioSlice';

export const getScientificInterests = (state: StateSchema) =>
    state.scientificPortfolio?.scientificInterests || initialState.scientificInterests;
