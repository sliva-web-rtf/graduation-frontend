import { CatalogOptions } from 'entities/CatalogList';

export interface CatalogSchema {
    option: CatalogOptions;
    options: Array<CatalogOptions>;
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOptions, number>;
    scientificInterests: Array<string>;
    scientificAreas: Array<string>;
    isFavoriteFilterOnly: boolean;
}
