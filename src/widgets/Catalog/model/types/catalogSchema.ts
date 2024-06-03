import { CatalogOption } from '../types/catalogOption';

export interface CatalogSchema {
    option: CatalogOption;
    options: Array<CatalogOption>;
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOption, number>;
    scientificInterests: Array<string>;
    scientificAreas: Array<string>;
    isFavoriteFilterOnly: boolean;
}
