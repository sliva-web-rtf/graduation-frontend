import { CatalogOptions } from '@/entities/CatalogList';

export interface AddToFavoritesRequest {
    readonly id: string;
    readonly isProfessor: boolean;
    readonly option: CatalogOptions;
    readonly isFavorite: boolean;
}
