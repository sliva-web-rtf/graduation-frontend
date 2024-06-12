import { StateSchema } from '@/app/providers/StoreProvider';

export const getCatalogPage = (state: StateSchema) => state.catalog.page;
