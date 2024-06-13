import { CatalogOption } from '@/widgets/Catalog';

export interface AddToFavoritesRequest {
    readonly id: string;
    readonly isProfessor: boolean;
    readonly option: CatalogOption;
    readonly isFavorite: boolean;
}
