import { CatalogOptions } from '@/entities/CatalogList';

export interface AddToFavoritesRequest {
    readonly id: string;
    readonly isProfessor: boolean;
    readonly option: CatalogOption;
    readonly isFavorite: boolean;
}
