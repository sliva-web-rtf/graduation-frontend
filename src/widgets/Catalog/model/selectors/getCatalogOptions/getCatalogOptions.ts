import { StateSchema } from 'app/providers/StoreProvider';

export const getCatalogOptions = (state: StateSchema) => state.catalog.options;
