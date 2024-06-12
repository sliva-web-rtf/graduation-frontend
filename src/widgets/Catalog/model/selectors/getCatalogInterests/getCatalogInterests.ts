import { StateSchema } from '@/app/providers/StoreProvider';

export const getCatalogInterests = (state: StateSchema) => state.catalog.scientificInterests;
