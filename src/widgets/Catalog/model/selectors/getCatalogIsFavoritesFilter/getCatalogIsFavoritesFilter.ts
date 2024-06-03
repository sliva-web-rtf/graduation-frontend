import { StateSchema } from 'app/providers/StoreProvider';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogIsFavoritesFilter = (state: StateSchema) =>
    state.catalog?.isFavoriteFilterOnly || initialState.isFavoriteFilterOnly;
