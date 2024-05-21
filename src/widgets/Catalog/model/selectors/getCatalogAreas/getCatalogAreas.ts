import { StateSchema } from 'app/providers/StoreProvider';

export const getCatalogAreas = (state: StateSchema) => state.catalog.scientificAreas;
