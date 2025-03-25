import { CatalogOption } from './catalogOption';

export interface CatalogSchema {
    option: CatalogOption;
    options: Array<CatalogOption>;
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOption, number>;
    scientificInterests: string[];
    directions: string[];
    isFavoriteFilterOnly: boolean;
}
