import { StateSchema } from 'app/providers/StoreProvider';

export const getCatalogIsFavoritesFilter = (state: StateSchema) => state.catalog.isFavoriteFilterOnly;
