import { StateSchema } from 'app/providers/StoreProvider';

export const getCatalogPageSize = (state: StateSchema) => state.catalog.pageSize;
