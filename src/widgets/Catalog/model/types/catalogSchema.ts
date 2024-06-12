import { CatalogOptions } from '@/entities/CatalogList';
import { ScientificArea } from '@/entities/ScientificAreas';

export interface CatalogSchema {
    option: CatalogOptions;
    options: Array<CatalogOptions>;
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOptions, number>;
    scientificInterests: Array<string>;
    scientificAreas: Array<ScientificArea>;
    isFavoriteFilterOnly: boolean;
}
