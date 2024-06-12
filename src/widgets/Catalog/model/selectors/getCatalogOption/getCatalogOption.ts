import { StateSchema } from '@/app/providers/StoreProvider';

export const getCatalogOption = (state: StateSchema) => state.catalog.option;
